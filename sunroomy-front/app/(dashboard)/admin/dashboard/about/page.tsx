"use client";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import AboutModal from "@/components/admin/views/about/AboutModal";
import { AboutOutdorr, WhyData } from "@/types/types";
import {
  Button,
  Card,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { Edit2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
const AboutPage = () => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const [whyData, setWhyData] = useState<WhyData[]>([]);
  const [aboutData, setAboutData] = useState<AboutOutdorr[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [updateSelect, setUpdateSelect] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [responseWhy, responseAbout] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/why-outdorr`),
          axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/about-outdorr`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.token}`,
              },
            },
          ),
        ]);

        setWhyData(responseWhy.data);
        setAboutData(responseAbout.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user.token) {
      fetchData();
    }
  }, [session?.user.token, updateSelect]);

  const onSubmit: SubmitHandler<FieldValues> = async (formSubmitData) => {
    try {
      setLoading(true);

      if (!formSubmitData.aboutData || formSubmitData.aboutData.length === 0) {
        toast.error("Please select at least one About Data item.");
        return;
      }

      const postData = {
        title:
          (formSubmitData?.title?.length > 1 &&
            isEditingTitle &&
            formSubmitData.title) ||
          whyData[0].title,
        description:
          (formSubmitData?.description?.length > 1 &&
            isEditingDescription &&
            formSubmitData.description) ||
          whyData[0].description,
        about_outdorr: formSubmitData.aboutData.split(","),
      };

      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/why-outdorr/${
          whyData && whyData[0]._id
        }`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token!}`,
          },
        },
      );

      toast.success("Successfully updated about!");
    } catch (error) {
      console.error("Error updating about:", error);
      toast.error("Error updating about.");
    } finally {
      setLoading(false);
      setIsEditingDescription(false);
      setIsEditingTitle(false);
    }
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const handleRefresh = () => {
    router.refresh();
    setUpdateSelect(!updateSelect);
  };

  const handleClick = async (id: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/about-outdorr/${id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        },
      );

      handleRefresh();
      router.push("/admin/dashboard/about");
    } catch (error) {
      console.error("Error deleting about:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto mt-6 max-w-[1280px] px-6">
        {loading || !aboutData ? (
          <div className="h-screen">
            <Preloader />
          </div>
        ) : (
          <PageWrapper>
            <h1 className="text-5xl">Update Why Sunroomy data</h1>
            <Card className="mt-8 p-4">
              <form
                className="flex flex-col gap-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex items-end gap-4">
                  <Input
                    {...register("title")}
                    isDisabled={loading || !isEditingTitle}
                    label="Title"
                    type="title"
                    name="title"
                    className="w-11/12"
                    size="lg"
                    id="title"
                    variant="underlined"
                    defaultValue={whyData[0]?.title}
                    placeholder="Enter your title"
                  />
                  <Button
                    className="w-1/12 rounded-[8px]"
                    size="lg"
                    color="primary"
                    onClick={() => setIsEditingTitle(!isEditingTitle)}
                  >
                    Edit
                    <Edit2Icon size={14} />
                  </Button>
                </div>
                <div className="flex items-end gap-4">
                  <Input
                    {...register("description")}
                    isDisabled={loading || !isEditingDescription}
                    label="Description"
                    type="title"
                    name="description"
                    size="lg"
                    id="description"
                    variant="underlined"
                    defaultValue={whyData[0]?.description}
                    placeholder="Enter your description"
                  />
                  <Button
                    className="w-1/12 rounded-[8px]"
                    size="lg"
                    onClick={() =>
                      setIsEditingDescription(!isEditingDescription)
                    }
                    color="primary"
                  >
                    Edit
                    <Edit2Icon size={14} />
                  </Button>
                </div>
                {
                  <div className="flex items-end gap-4">
                    <Select
                      items={aboutData!}
                      {...register("aboutData")}
                      label="Select About Data"
                      variant="underlined"
                      selectionMode="multiple"
                      placeholder="Select About Data"
                      className="w-10/12"
                    >
                      {(aboutItem) => (
                        // <SelectItem key={aboutItem._id} value={aboutItem._id}>
                        //   {aboutItem.key}
                        // </SelectItem>
                        <SelectItem
                          key={aboutItem._id}
                          textValue={aboutItem.key}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex flex-col">
                              <span className="text-medium font-medium">
                                {aboutItem.key}
                              </span>
                            </div>
                            <Button
                              onClick={(e) => handleClick(aboutItem._id)}
                              color="danger"
                              size="sm"
                              radius="full"
                              variant="bordered"
                            >
                              Delete
                            </Button>
                          </div>
                        </SelectItem>
                      )}
                    </Select>
                    <Button
                      className="w-2/12 rounded-[8px]"
                      size="lg"
                      color="primary"
                      onPress={onOpen}
                    >
                      Create About Info
                    </Button>
                  </div>
                }
                <Button
                  className="rounded-[8px]"
                  size="lg"
                  color="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Card>
            <AboutModal
              whyOutdorr={whyData[0]?._id}
              session={session}
              isOpen={isOpen}
              onOpen={onOpen}
              reloadPage={handleRefresh}
              onOpenChange={onOpenChange}
            />
          </PageWrapper>
        )}
      </div>
    </>
  );
};
export default AboutPage;

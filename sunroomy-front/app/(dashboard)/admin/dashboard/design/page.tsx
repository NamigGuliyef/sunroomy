"use client";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import DesignModal from "@/components/admin/views/design/DesignModal";
import { Input as ShadInput } from "@/components/admin/ui/input";
import { IDesignData, IDesignDetailsData } from "@/types/types";
import {
  Button,
  Card,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Link from "next/link";
import { Edit, Save } from "lucide-react";
const AboutPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const [designData, setDesignData] = useState<IDesignData[]>([]);
  const [detailsData, setDetailsData] = useState<IDesignDetailsData[]>([]);
  const [updateSelect, setUpdateSelect] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/project-design"
        );
        setDesignData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };

    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL +
            "/admin/dashboard/project-design-details",
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          }
        );
        setDetailsData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    if (session?.user.token) {
      fetchDetails().then(() => setLoading(false));
    }
  }, [session?.user.token, updateSelect]);

  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = async (
    formSubmitData,
    event
  ) => {
    event?.preventDefault();
    setIsSubmitting(true);
    if (
      !formSubmitData.design_details ||
      formSubmitData.design_details.length === 0
    ) {
      setIsSubmitting(false);
      toast.error("Please select at least one design details item!");
      return;
    }
    const postData = {
      title:
        formSubmitData.title.length > 0
          ? formSubmitData.title
          : designData[0]?.title,
      description:
        formSubmitData.description.length > 0
          ? formSubmitData.description
          : designData[0]?.description,
      design_details: formSubmitData.design_details.split(","),
    };
    ;
    const res = await axios
      .patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/project-design/${designData[0]?._id}`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token!}`,
          },
        }
      )
      .then((response) => {
        setIsSubmitting(false);
        toast.success("Successfully updated page!");
      })
      .catch((err) => {
        setIsSubmitting(false);
        toast.error("Error updating page.");
      })
      .finally(() => {});
  };
  const handleRefresh = () => {
    router.refresh();
    setUpdateSelect(!updateSelect);
  };
  return (
    <>
      <div className="container mt-6 mx-auto px-6 max-w-[1280px]">
        {loading ? (
          <div className="h-screen">
            <Preloader />
          </div>
        ) : (
          <PageWrapper>
            <h1 className="text-5xl">Update Tailored Design Page</h1>
            <Card className="p-4 mt-8">
              <form
                className="flex flex-col gap-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  {...register("title")}
                  label="Page title"
                  type="text"
                  name="title"
                  size="lg"
                  id="title"
                  variant="underlined"
                  defaultValue={designData[0]?.title}
                  placeholder="Enter your title"
                />
                <Input
                  {...register("description")}
                  label="Page description"
                  type="text"
                  name="description"
                  size="lg"
                  id="title"
                  variant="underlined"
                  defaultValue={designData[0]?.description}
                  placeholder="Enter your description"
                />
                <div className="flex items-end gap-4">
                  <Select
                    items={detailsData.sort((a, b) => a.step.localeCompare(b.step))!}
                    {...register("design_details")}
                    label="Select details items"
                    variant="underlined"
                    selectionMode="multiple"
                    placeholder="Select details"
                    className="w-10/12"
                  >
                    {(detailsItem) => (
                      <SelectItem key={detailsItem._id} value={detailsItem._id}>
                        {detailsItem.step + ". " + detailsItem.title}
                      </SelectItem>
                    )}
                  </Select>
                  <Link href={"./design/new"} className="w-2/12">
                    <Button
                      className="rounded-[8px] w-full"
                      size="lg"
                      color="primary"
                    >
                      Create Step
                    </Button>
                  </Link>
                </div>
                <div className="flex gap-8">
                  <Button
                    className="rounded-[8px] w-1/2"
                    size="lg"
                    color="primary"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Save
                    <Save strokeWidth={1} />
                  </Button>
                  <Link href={"/admin/dashboard/design/steps"} className="w-1/2">
                    <Button
                      className="rounded-[8px] w-full"
                      size="lg"
                      color="primary"
                    >
                      Edit steps <Edit strokeWidth={1} />
                    </Button>
                  </Link>
                </div>
              </form>
            </Card>
            <DesignModal
              projectDesign={designData[0]?._id}
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

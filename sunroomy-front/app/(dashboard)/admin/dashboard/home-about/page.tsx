"use client";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import { Button, Card, Input } from "@nextui-org/react";
import axios from "axios";
import { Edit2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { IHomeAbout } from "@/types/types";
import { useRouter } from "next/navigation";

const InspirePage = () => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [homeAboutData, setHomeAboutData] = useState<IHomeAbout[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/home_about_us`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          },
        );

        setHomeAboutData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user.token) {
      fetchData();
    }
  }, [session?.user.token]);
  const onSubmit: SubmitHandler<FieldValues> = async (formSubmitData) => {
    try {
      setLoading(true);
      const postData = {
        title: formSubmitData.title || homeAboutData[0].title,
        description: formSubmitData.description || homeAboutData[0].description,
      };
      (postData);
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/home_about_us/${
          homeAboutData && homeAboutData[0]._id
        }`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token!}`,
          },
        },
      );

      toast.success("Successfully updated about!");

      // Refetch the updated data
      const updatedRes = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/home_about_us`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        },
      );

      setHomeAboutData(updatedRes.data);

      router.push("/admin/dashboard/home-about");
    } catch (error) {
      console.error("Error updating about:", error);
      toast.error("Error updating about.");
    } finally {
      setLoading(false);
      setIsEditingDescription(false);
      setIsEditingTitle(false);
    }
  };

  return (
    <>
      <div className="container mx-auto mt-6 max-w-[1280px] px-6">
        {loading ? (
          <div className="h-screen">
            <Preloader />
          </div>
        ) : (
          <PageWrapper>
            <h1 className="text-5xl">Update Home About Us Component</h1>
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
                    variant="underlined"
                    defaultValue={homeAboutData[0].title}
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
                    type="description"
                    name="description"
                    size="lg"
                    variant="underlined"
                    defaultValue={homeAboutData[0].description}
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
          </PageWrapper>
        )}
      </div>
    </>
  );
};

export default InspirePage;

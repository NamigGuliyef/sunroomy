"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button, Card, Input, useDisclosure } from "@nextui-org/react";
import { Edit2Icon } from "lucide-react";
import toast from "react-hot-toast";
import Preloader from "@/components/admin/Preloader";
import { PageWrapper } from "@/components/PageWrapper";
import { Input as ShadInput } from "@/components/admin/ui/input";
import { Label } from "@radix-ui/react-label";

import { IInspire } from "@/types/types";

const InspirePage = () => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [inspireData, setInspireData] = useState<IInspire[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/letUs-inspire-you`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          },
        );

        setInspireData(res.data);
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
      const postData = new FormData();
      console.log(formSubmitData);
      for (let [key, values] of Object.entries(formSubmitData)) {
        if (key === "photos" && values && values.length >= 1) {
          for (let i = 0; i < values.length; i++) {
            postData.append("photos", values[i]);
          }
        } else if (
          key !== "photos" &&
          values !== null &&
          values?.length > 0 &&
          values !== undefined
        ) {
          postData.append(key, values);
        }
      }
      await axios.patch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/admin/dashboard/letUs-inspire-you/${
          inspireData && inspireData[0]._id
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

  return (
    <>
      <div className="container mx-auto mt-6 max-w-[1280px] px-6">
        {loading ? (
          <div className="h-screen">
            <Preloader />
          </div>
        ) : (
          <PageWrapper>
            <h1 className="text-5xl">Update Inspire Page</h1>
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
                    defaultValue={inspireData[0].title}
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
                    defaultValue={inspireData[0].description}
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
                <Label>files</Label>
                <ShadInput
                  id="files"
                  placeholder="files"
                  {...register("photos")}
                  color="primary"
                  className="flex h-[64px] items-center justify-center file:mt-1 file:rounded-large file:bg-primary file:px-4 file:py-2 file:text-white file:shadow-lg file:hover:cursor-pointer hover:file:bg-primary/90"
                  type="file"
                  multiple
                />
                {/* Photo Input - You can add your logic for handling photos here */}

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

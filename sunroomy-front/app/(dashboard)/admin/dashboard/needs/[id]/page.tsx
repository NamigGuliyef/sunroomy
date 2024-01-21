/* eslint-disable @next/next/no-img-element */
"use client";
import NotFoundPage from "@/app/(dashboard)/not-found";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import { IProjectNeed } from "@/types/types";
import { Button, Card, Input } from "@nextui-org/react";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface FormSubmitData {
  title?: string;
  description?: string;
}

const titleRegex = /^[A-Za-z -]{3,50}$/; // Extracted regex for reusability

const NeedsPage = ({ params }: { params: { id: string } }) => {
  const [data, setData] = useState<IProjectNeed | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/projectneeds/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          },
        );

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user.token) {
      fetchNeeds();
    }
  }, [session?.user.token, params.id]);

  const onSubmit: SubmitHandler<FormSubmitData> = async (formSubmitData) => {
    setSubmitLoading(true);

    if (
      formSubmitData.title === data?.title &&
      formSubmitData.description === data?.description
    ) {
      toast.error("Data is the same!");
      setSubmitLoading(false);
      return;
    }

    if (!titleRegex.test(formSubmitData.title!)) {
      toast.error("Title cannot contain numbers!");
      setSubmitLoading(false);
      return;
    }

    const postData: FormSubmitData = {
      title: formSubmitData.title?.trim(),
      description: formSubmitData.description,
    };

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/projectneeds/${params.id}`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token!}`,
          },
        },
      );

      toast.success("Successfully updated project need!");
      router.push("/admin/dashboard/needs");
    } catch (error) {
      if (error) {
        toast.error("There's a project need with that name already!");
      } else {
        console.error("Error submitting data");
        toast.error("Error updating project need");
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-6 max-w-[1280px] px-6">
      {loading ? (
        <div className="h-screen">
          <Preloader />
        </div>
      ) : (
        <PageWrapper>
          <h1 className="text-5xl">Create Project Needs</h1>
          <Card className="mt-8 p-4">
            <form
              className="flex flex-col gap-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                {...register("title", { required: true })}
                label="Title"
                type="text"
                name="title"
                size="lg"
                id="title"
                defaultValue={data?.title}
                variant="underlined"
                placeholder="Enter your title"
              />
              <Input
                {...register("description", { required: true })}
                label="Description"
                type="text"
                name="description"
                defaultValue={data?.description}
                size="lg"
                id="description"
                variant="underlined"
                placeholder="Enter your description"
              />
              <Button
                className="rounded-[8px]"
                size="lg"
                isLoading={submitLoading}
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
  );
};

export default NeedsPage;

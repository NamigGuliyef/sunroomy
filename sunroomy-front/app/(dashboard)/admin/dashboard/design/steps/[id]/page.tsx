"use client";
import { PageWrapper } from "@/components/PageWrapper";
import { Input as ShadInput } from "@/components/admin/ui/input";
import { IDesignData, IDesignDetailsData } from "@/types/types";
import { Button, Card, Input } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EditDesignPage = ({ params }: { params: { id: string } }) => {
  const { data: session } = useSession();
  const [designDetailsData, setDesignDetailsData] =
    useState<IDesignDetailsData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL +
            "/project-design-details/" +
            params.id
        );
        setDesignDetailsData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };
    fetchData();
  }, [params.id]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = async (data, event) => {
    setLoading(true);
    event?.preventDefault();
    const postData = {
      step: data.step.length > 0 ? data.step : designDetailsData?.step,
      title: data.title.length > 0 ? data.title : designDetailsData?.title,
      description:
        data.description.length > 0
          ? data.description
          : designDetailsData?.description,
      project_design: designDetailsData?.project_design,
      photo: data.files[0],
    };

    const res = await axios
      .patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/project-design-details/${designDetailsData?._id}`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token!}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("Successfully updated design details");
          setLoading(false);
          router.push("/admin/dashboard/design");
        }
      });
    const handleErrorResponse = (err: any) => {
      if (err.response.status === 400) {
        toast.error("Please fill in all the fields");
      } else if (err.response.status === 401) {
        toast.error("Unauthorized");
      } else if (err.response.status === 500) {
        toast.error("Server error");
      } else if (err.response.status === 404) {
        toast.error("Not found");
      } else if (err.response.status === 403) {
        toast.error("Forbidden");
      } else if (err.response.status === 409) {
        toast.error("Use different name");
      }
      setLoading(false);
    };
  };

  return (
    <>
      <div className="container mt-6 mx-auto px-6 max-w-[1280px]">
        <PageWrapper>
          <h1 className="text-5xl">Edit Tailored Design Step: </h1>
          <Card className="p-4 mt-8">
            <form
              className="flex flex-col gap-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                label="Step"
                type="text"
                {...register("step")}
                name="step"
                size="lg"
                id="description"
                variant="underlined"
                defaultValue={designDetailsData?.step}
                placeholder="Enter your step (Example: Step 1)"
              />
              <Input
                label="Title"
                type="text"
                {...register("title")}
                name="title"
                size="lg"
                id="title"
                variant="underlined"
                defaultValue={designDetailsData?.title}
                placeholder="Enter your title"
              />
              <Input
                label="Description"
                {...register("description")}
                type="text"
                name="description"
                size="lg"
                id="description"
                variant="underlined"
                defaultValue={designDetailsData?.description}
                placeholder="Enter your description"
              />
              <ShadInput
                id="file"
                {...register("files")}
                placeholder="file"
                color="primary"
                className="file:bg-primary flex items-center justify-center h-[64px] file:shadow-lg file:hover:cursor-pointer file:text-white hover:file:bg-primary/90 file:py-2 file:mt-1 file:px-4 file:rounded-large"
                type="file"
                multiple
              />
              <div className="flex w-full gap-8">
                <Button
                  className="rounded-[8px] w-1/2"
                  size="lg"
                  color="primary"
                  type="submit"
                  isLoading={loading}
                >
                  Submit
                </Button>
                <Link href={"./"} className="w-1/2">
                  <Button
                    className="rounded-[8px] w-full"
                    size="lg"
                    color="primary"
                  >
                    Tailored Design
                  </Button>
                </Link>
              </div>
            </form>
          </Card>
        </PageWrapper>
      </div>
    </>
  );
};
export default EditDesignPage;

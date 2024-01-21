"use client";
import { PageWrapper } from "@/components/PageWrapper";
import { Input as ShadInput } from "@/components/admin/ui/input";
import { IDesignData } from "@/types/types";
import { Button, Card, Input } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const NewDesignPage = () => {
  const { data: session } = useSession();
  const [designData, setDesignData] = useState<IDesignData[]>([]);
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
    fetchData();
  }, []);
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
      step: data.step,
      title: data.title,
      description: data.description,
      project_design: designData[0]._id,
      photo: data.files[0],
    };
    const res = await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/project-design-details/`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token!}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          toast.success("Successfully created new design details");
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
          <h1 className="text-5xl">Create Tailored Design Step</h1>
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
                <Link href={"./steps"} className="w-1/3">
                  <Button
                    className="rounded-[8px] w-full"
                    size="lg"
                    color="primary"
                  >
                    Edit steps
                  </Button>
                </Link>
                <Button
                  className="rounded-[8px] w-1/3"
                  size="lg"
                  color="primary"
                  type="submit"
                  isLoading={loading}
                >
                  Submit
                </Button>
                <Link href={"./"} className="w-1/3">
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
export default NewDesignPage;

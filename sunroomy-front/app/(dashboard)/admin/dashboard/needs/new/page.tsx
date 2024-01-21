/* eslint-disable @next/next/no-img-element */
"use client";
import NotFoundPage from "@/app/(dashboard)/not-found";
import { PageWrapper } from "@/components/PageWrapper";
import { Button, Card, Input } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const NeedsPage = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (
    formSubmitData,
    event,
  ) => {
    setLoading(true);
    const res = await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/projectneeds`,
        formSubmitData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token!}`,
          },
        },
      )
      .then((response) => {
        setLoading(false);
        toast.success("Successfully created project need!");
        router.push("/admin/dashboard/needs");
      })
      .catch((err) => {
        if (err.response.status === 409) {
          toast.error("There's a project need with that name already!");
        }
        setLoading(false);
      });
  };
  if (error) return <NotFoundPage />;
  return (
    <div className="container mx-auto mt-6 max-w-[1280px] px-6">
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
              variant="underlined"
              placeholder="Enter your title"
            />
            <Input
              {...register("description", { required: true })}
              label="Description"
              type="text"
              name="description"
              size="lg"
              id="description"
              variant="underlined"
              placeholder="Enter your description"
            />
            <Button
              className="rounded-[8px]"
              size="lg"
              isLoading={loading}
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Card>
      </PageWrapper>
    </div>
  );
};

export default NeedsPage;

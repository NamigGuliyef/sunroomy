"use client";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import { Button, Card, Input, Textarea } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const NotifyPage = () => {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (formSubmitData) => {
    setIsSubmitting(true)
    const res = await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/subscribers/sendEmail`,
        formSubmitData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token!}`,
          },
        }
      )
      .then((response) => {
        setIsSubmitting(false);
        toast.success("Successfully sent email!");
      })
      .catch((err) => {
        setIsSubmitting(false);
        toast.error("Error sending email.");
      })
      .finally(() => {});
  };
  const router = useRouter();

  return (
    <>
      <div className="container mt-6 mx-auto px-6 max-w-[1280px]">
        <PageWrapper>
          {isSubmitting && (
            <div className="h-full w-full">
              <Preloader />
            </div>
          )}
          <h1 className="text-5xl">Notify users</h1>
          <Card className="p-4 mt-8">
            <form
              className="flex flex-col gap-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                {...register("text")}
                label="Text"
                type="text"
                name="text"
                size="lg"
                id="text"
                variant="underlined"
                placeholder="Enter your text"
              />
              <Textarea
                variant="underlined"
                label="Description"
                placeholder="Enter your message"
              />
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
      </div>
    </>
  );
};
export default NotifyPage;

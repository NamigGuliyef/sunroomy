"use client";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import { IFollowUsLink, IHomePageHero } from "@/types/types";
import { Button, Card, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input as ShadInput } from "@/components/admin/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
const CreateFollowUsLink = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFollowUsLink>();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const onSubmit: SubmitHandler<IFollowUsLink> = async (formSubmitData) => {
    console.log(formSubmitData)
    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/followUs`,
        formSubmitData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token!}`,
          },
        },
      );
      toast.success("Successfully updated links!");
      router.push("/admin/dashboard/follow-us");
    } catch (error) {
      console.error("Error updating links:", error);
      toast.error("Error updating links.");
    } finally {
      setLoading(false);
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
            <h1 className="text-5xl">Create follow us link</h1>
            <Card className="mt-8 p-4">
              <form
                className="flex flex-col gap-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  {...register("name", {
                    required: true,
                  })}
                  label="Enter your title"
                  type="text"
                  name="name"
                  className="w-11/12"
                  size="lg"
                  variant="underlined"
                  placeholder="Example: instagram"
                />
                <Input
                  {...register("link", {
                    required: true,
                  })}
                  label="Enter your link"
                  type="text"
                  name="link"
                  className="w-11/12"
                  size="lg"
                  variant="underlined"
                  placeholder="Example: https://instagram.com/sunroomy"
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
        )}
      </div>
    </>
  );
};

export default CreateFollowUsLink;

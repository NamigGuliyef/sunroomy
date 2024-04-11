"use client";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import { IHomePageHero } from "@/types/types";
import { Button, Card, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input as ShadInput } from "@/components/admin/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
const CreateHeroPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IHomePageHero>();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const onSubmit: SubmitHandler<IHomePageHero> = async (formSubmitData) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(formSubmitData)) {
      if (key === "photo" && value && value.length >= 1) {
        for (let i = 0; i < value.length; i++) {
          formData.append("photo", value[i]);
        }
      } else if (key !== "photo" && value.length > 1) {
        formData.append(key, value);
      }
    }
    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/homepage_hero`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token!}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      toast.success("Successfully updated hero!");
      router.push("/admin/dashboard/hero");
    } catch (error) {
      console.error("Error updating hero:", error);
      toast.error("Error updating hero.");
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
            <h1 className="text-5xl">Create Homepage hero slide</h1>
            <Card className="mt-8 p-4">
              <form
                className="flex flex-col gap-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  {...register("title", {
                    required: true,
                  })}
                  label="Enter your title"
                  type="text"
                  name="title"
                  className="w-11/12"
                  size="lg"
                  variant="underlined"
                  placeholder="Example: Sunroom"
                />
                <Input
                  {...register("subtitle", {
                    required: true,
                  })}
                  label="Enter your subtitle"
                  type="text"
                  name="subtitle"
                  className="w-11/12"
                  size="lg"
                  variant="underlined"
                  placeholder="Example: Galax"
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
                  placeholder="Example: /products/sunroom"
                />
                <ShadInput
                  id="photos"
                  placeholder="photo"
                  {...register("photo", {
                    required: true,
                  })}
                  color="primary"
                  className="flex h-[64px] items-center justify-center file:mt-1 file:rounded-large file:bg-primary file:px-4 file:py-2 file:text-white file:shadow-lg file:hover:cursor-pointer hover:file:bg-primary/90"
                  type="file"
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

export default CreateHeroPage;

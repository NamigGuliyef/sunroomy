"use client";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import { ISubProductPlacement } from "@/types/types";
import { Button, Card, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input as ShadInput } from "@/components/admin/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
const CreateSubProdPlacement = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISubProductPlacement>();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const onSubmit: SubmitHandler<ISubProductPlacement> = async (
    formSubmitData,
  ) => {
    // const formData = new FormData();

    // for (const [key, value] of Object.entries(formSubmitData)) {
    //   if (key === "photo" && value && value.length >= 1) {
    //     for (let i = 0; i < value.length; i++) {
    //       formData.append("photo", value[i]);
    //     }
    //   } else if (key !== "photo" && value.length > 1) {
    //     formData.append(key, value);
    //   }
    // }
    // formData.append("subproductPlacementId", params.id);
    try {
      setLoading(true);
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/subproduct-placement`,
        formSubmitData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token!}`,
          },
        },
      );
      toast.success("Successfully updated !");
      router.push("/admin/dashboard/subproduct-placement");
    } catch (error) {
      console.error("Error adding :", error);
      toast.error("Error adding .");
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
            <h1 className="text-5xl">
              Create Subproduct Placement Combinations
            </h1>
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
                  {...register("description", {
                    required: true,
                  })}
                  label="Enter your description"
                  type="text"
                  name="description"
                  className="w-11/12"
                  size="lg"
                  variant="underlined"
                  placeholder="Example: Sunroom"
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

export default CreateSubProdPlacement;

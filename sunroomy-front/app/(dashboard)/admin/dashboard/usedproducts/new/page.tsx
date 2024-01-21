/* eslint-disable @next/next/no-img-element */
"use client";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import { Input as ShadInput } from "@/components/admin/ui/input";
import { IUsedProduct } from "@/types/types";
import { Button, Card, Input } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const UsedProductsPage = ({ params }: { params: { id: string } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [usedProduct, setUsedProduct] = useState<IUsedProduct | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const { data: session, status } = useSession();
  const router = useRouter();

  // ! fetch todo

  const onSubmit: SubmitHandler<FieldValues> = async (data, event) => {
    const formData = new FormData();
    for (let [key, value] of Object.entries(data)) {
      if (key === "photos" && value && value.length >= 1) {
        for (let i = 0; i < value.length; i++) {
          formData.append("photos", value[i]);
        }
      } else if (key !== "photos" && (value !== null || value.length > 0)) {
        formData.append(key, value);
      }
    }

    setIsLoading(true);
    const res = await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/usedproducts`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setIsLoading(false);
        toast.success("Successfully added used product!");
        router.push("/admin/dashboard/usedproducts");
        router.refresh();
      })
      .catch((err) => {
        if (err?.response?.status === 409) {
          toast.error("This used product has already been added");
        }
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading ? (
        <div className="h-screen">
          <Preloader />
        </div>
      ) : (
        <div className="container mt-6 mx-auto px-6 max-w-[1280px]">
          <PageWrapper>
            <h1 className="text-5xl">Create used product</h1>
            <Card className="p-4 mt-8">
              <form
                className="flex flex-col gap-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  {...register("title")}
                  label="Title"
                  type="title"
                  name="title"
                  defaultValue={usedProduct?.title}
                  size="lg"
                  id="title"
                  variant="underlined"
                  placeholder="Enter your title"
                />
                <Input
                  {...register("description")}
                  label="Description"
                  type="title"
                  name="description"
                  size="lg"
                  id="description"
                  variant="underlined"
                  placeholder="Enter your description"
                />
                <ShadInput
                  id="photos"
                  placeholder="photos"
                  {...register("photos")}
                  color="primary"
                  className="file:bg-primary flex items-center justify-center h-[64px] file:shadow-lg file:hover:cursor-pointer file:text-white hover:file:bg-primary/90 file:py-2 file:mt-1 file:px-4 file:rounded-large"
                  type="file"
                  multiple
                />

                <Button
                  className="rounded-[8px]"
                  size="lg"
                  color="primary"
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  as={Link}
                  className="rounded-[8px]"
                  size="lg"
                  href="./"
                  color="primary"
                >
                  View All
                </Button>
              </form>
            </Card>
          </PageWrapper>
        </div>
      )}
    </>
  );
};

export default UsedProductsPage;

/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Input as ShadInput } from "@/components/admin/ui/input";
import { Button, Card, Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import toast from "react-hot-toast";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import Link from "next/link";
import { IProductApplication, ISubProduct } from "@/types/types";

const ApplicationsPage = ({ params }: { params: { id: string } }) => {
  const [subproducts, setSubproducts] = useState<ISubProduct[] | null>(null);
  const [applicationData, setApplicationData] =
    useState<IProductApplication | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [subproductsResponse, applicationsResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/subproducts/`),
          axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/applications/${params.id}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.token}`,
              },
            }
          ),
        ]);

        setSubproducts(subproductsResponse.data);
        setApplicationData(applicationsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchData();
    }
  }, [status, session?.user.token, params.id]);

  const onSubmit: SubmitHandler<FieldValues> = async (data, event) => {
    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if (key === "photos" && value && value.length >= 1) {
        for (let i = 0; i < value.length; i++) {
          formData.append("photos", value[i]);
        }
      } else if (key !== "photos" && value.length > 1) {
        formData.append(key, value);
      }
    }

    setIsLoading(true);
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/applications/${params.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Successfully added application!");
      router.push("/admin/dashboard/applications");
      router.refresh();
    } catch (error) {
      if (error === 409) {
        toast.error("This application has already been added");
      } else {
        console.error("Error submitting data:", error);
        toast.error("Error submitting data");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      {isLoading ? (
        <div className="h-screen">
          <Preloader />
        </div>
      ) : (
        <div className="container mt-6 mx-auto px-6 max-w-[1280px]">
          <h1 className="text-5xl">{applicationData?.title}</h1>
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
                size="lg"
                id="title"
                defaultValue={applicationData?.title}
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
                defaultValue={applicationData?.description}
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
              {subproducts && (
                <Select
                  items={subproducts}
                  label="Subproducts"
                  color="default"
                  {...register("subProductId")}
                  variant="underlined"
                  placeholder="Select subproducts"
                >
                  {(subproduct) => (
                    <SelectItem value={subproduct._id} key={subproduct._id}>
                      {subproduct.title}
                    </SelectItem>
                  )}
                </Select>
              )}
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
        </div>
      )}
    </PageWrapper>
  );
};

export default ApplicationsPage;

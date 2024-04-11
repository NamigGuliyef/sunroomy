"use client";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import AboutUsEditor from "@/components/admin/aboutUsEditor";
import { Input as ShadInput } from "@/components/admin/ui/input";
import { ISubProductCustomItem } from "@/types/types";
import { Button, Card } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
const EditSubProdCustomItem = ({ params }: { params: { id: string } }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ISubProductCustomItem>();
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();
  const [data, setData] = useState<null | ISubProductCustomItem>(null);
  useEffect(() => {
    const fetchCustom = async () => {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/subproduct-customItem/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.token!}`,
            },
          },
        )
        .then((res) => {
          setData(res.data);
          setLoading(false);
        });
    };
    if (session?.user.token) {
      fetchCustom();
    }
  }, [session?.user.token]);
  const onSubmit: SubmitHandler<ISubProductCustomItem> = async (
    formSubmitData,
  ) => {
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
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/subproduct-customItem/${params.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token!}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      toast.success("Successfully updated item!");
      router.push("/admin/dashboard/subproduct-custom");
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Error updating item.");
    } finally {
      setLoading(false);
    }
  };
  const handleChangeDesc = (e: any) => {
    setValue("description", e);
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
              Create Subproduct Custom Combinations item{" "}
            </h1>
            <Card className="mt-8 p-4">
              <form
                className="flex flex-col gap-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* <Input
                  {...register("description", {
                    required: true,
                  })}
                  label="Enter your title"
                  type="text"
                  name="title"
                  defaultValue={data?.description}
                  className="w-11/12"
                  size="lg"
                  variant="underlined"
                  placeholder="Example: Sunroom"
                /> */}
                <AboutUsEditor
                  desc={data?.description!}
                  onChangeDesc={handleChangeDesc}
                />
                <ShadInput
                  id="photos"
                  placeholder="photo"
                  {...register("photo")}
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

export default EditSubProdCustomItem;

/* eslint-disable @next/next/no-img-element */
"use client";
import NotFoundPage from "@/app/(dashboard)/not-found";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import AboutUsEditor from "@/components/admin/aboutUsEditor";
import { Input as ShadInput } from "@/components/admin/ui/input";
import { IProduct, ISubProduct } from "@/types/types";
import { Button, Card, Input, Select, SelectItem } from "@nextui-org/react";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useSession } from "next-auth/react";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ProductsPage = ({ params }: { params: { slug: string } }) => {
  const [data, setData] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [desc, setDesc] = useState<string | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${params.slug}`,
        );

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.slug]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (
    formSubmitData,
    event,
  ) => {
    const postData = {
      title: formSubmitData.title === data?.title ? null : formSubmitData.title,
      description:
        formSubmitData.description === data?.description
          ? null
          : formSubmitData.description,
      photo: formSubmitData.files[0],
      cover_photo: formSubmitData.cover_photo[0],
    };
    setLoading(true);
    const res = await axios
      .patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/products/${data?._id}`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token!}`,
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then((response) => {
        setLoading(false);
        toast.success("Successfully updated product!");
        router.push("/admin/dashboard/products");
        router.refresh();
      })
      .catch((err) => {
        if (err.response.status === 409) {
          toast.error("There's a product with that name already!");
        }
        setLoading(false);
      });
  };
  if (error) {
    notFound();
  }
  const handleChangeDesc = (e: any) => {
    setValue("description", e);
  };
  return (
    <div className="container mx-auto mt-6 max-w-[1280px] px-6">
      {loading ? (
        <div className="h-screen">
          <Preloader />
        </div>
      ) : (
        <PageWrapper>
          <h1 className="text-5xl">Product data</h1>
          <Card className="mt-8 p-4">
            <form
              className="flex flex-col gap-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                {...register("title")}
                isDisabled={loading}
                label="Title"
                type="title"
                name="title"
                size="lg"
                id="title"
                variant="underlined"
                defaultValue={data?.title!}
                placeholder="Enter your title"
              />
              <AboutUsEditor
                desc={data?.description!}
                onChangeDesc={handleChangeDesc}
              />
              {/* <Input
                {...register("description")}
                isDisabled={loading}
                label="Description"
                type="title"
                name="description"
                size="lg"
                id="description"
                variant="underlined"
                defaultValue={data?.description}
                placeholder="Enter your description"
              /> */}
              <Label>Page Photo</Label>
              <ShadInput
                id="file"
                placeholder="file"
                {...register("files")}
                color="primary"
                className="flex h-[64px] items-center justify-center file:mt-1 file:rounded-large file:bg-primary file:px-4 file:py-2 file:text-white file:shadow-lg file:hover:cursor-pointer hover:file:bg-primary/90"
                type="file"
                multiple
              />
              <Label>Cover Photo</Label>
              <ShadInput
                id="file"
                placeholder="file"
                {...register("cover_photo")}
                color="primary"
                className="flex h-[64px] items-center justify-center file:mt-1 file:rounded-large file:bg-primary file:px-4 file:py-2 file:text-white file:shadow-lg file:hover:cursor-pointer hover:file:bg-primary/90"
                type="file"
                multiple
              />
              {/* {subproducts && (
                <Select
                  items={subproducts}
                  label="Subproducts"
                  color="default"
                  selectionMode="multiple"
                  {...register("subproducts")}
                  variant="underlined"
                  placeholder="Select subproducts"
                >
                  {(subproduct) => (
                    <SelectItem value={subproduct._id} key={subproduct._id}>
                      {subproduct.title}
                    </SelectItem>
                  )}
                </Select>
              )} */}

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
  );
};

export default ProductsPage;

/* eslint-disable @next/next/no-img-element */
"use client";
import NotFoundPage from "@/app/(dashboard)/not-found";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import { Input as ShadInput } from "@/components/admin/ui/input";
import { IFeature, IProduct, ISubProduct } from "@/types/types";
import { Button, Card, Input, Select, SelectItem } from "@nextui-org/react";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ProjectsPage = ({ params }: { params: { slug: string } }) => {
  const [data, setData] = useState<ISubProduct | null>(null);
  const [features, setFeatures] = useState<IFeature[] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(false);
  const subproductFeatures = features?.filter(
    (feature) => feature.subProductId,
  );

  const { data: session, status } = useSession();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subproductResponse, featuresResponse, productsResponse] =
          await Promise.all([
            axios.get(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/subproducts/${params.slug}`,
            ),
            axios.get(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/features`,
              {
                headers: { Authorization: `Bearer ${session?.user.token}` },
              },
            ),
            axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/`),
          ]);

        setData(subproductResponse.data);
        setFeatures(featuresResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user.token) {
      fetchData();
    }
  }, [session?.user.token, params.slug]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = async (
    formSubmitData,
    event,
  ) => {
    const postData = new FormData();
    for (let [key, values] of Object.entries(formSubmitData)) {
      if (key === "photos" && values && values.length >= 1) {
        for (let i = 0; i < values.length; i++) {
          postData.append("photos", values[i]);
        }
      } else if (key === "title" && values === data?.title) {
        postData.delete("title");
      } else if (key === "cover_photo" && values && values.length >= 1) {
        postData.append("cover_photo", values[0]);
      } else if (key === "productId" && values && values.length >= 1) {
        postData.append("productId", values);
      } else if (key === "featuresIds" && values && values.length >= 1) {
        const featuresArray = values.split(",");
        for (let i = 0; i < featuresArray.length; i++) {
          postData.append("featuresIds[]", featuresArray[i]);
        }
      } else if (key === "specifications" && values && values.length >= 1) {
        const specificationsArray = values.split(",");
        for (let i = 0; i < specificationsArray.length; i++) {
          postData.append("specifications[]", specificationsArray[i]);
        }
      } else if (
        key !== "photos" &&
        key !== "cover_photo" &&
        key !== "featuresId" &&
        values !== null &&
        values.length > 0
      ) {
        postData.append(key, values);
      }
    }
    const res = await axios
      .patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/subproducts/${data?._id}`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token!}`,
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then((response) => {
        setIsSubmitting(false);
        toast.success("Successfully updated subproduct!");
        router.push("/admin/dashboard/subproducts");
        router.refresh();
      })
      .catch((err) => {
        if (err.response.status === 409) {
          toast.error("There's a project with that name already!");
        }
        setIsSubmitting(false);
      });
  };

  if (error) return <NotFoundPage />;
  return (
    <div className="container mx-auto mt-6 max-w-[1280px] px-6">
      {isLoading ? (
        <div className="h-screen">
          <Preloader />
        </div>
      ) : (
        <PageWrapper>
          <h1 className="text-5xl">Edit subproduct data</h1>
          <Card className="mt-8 p-4">
            <form
              className="flex flex-col gap-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                {...register("title")}
                isDisabled={isLoading}
                label="Title"
                type="text"
                name="title"
                size="lg"
                id="title"
                variant="underlined"
                defaultValue={data?.title!}
                placeholder="Enter your title"
              />
              <Input
                {...register("description")}
                isDisabled={isLoading}
                label="Description"
                type="text"
                name="description"
                size="lg"
                id="description"
                variant="underlined"
                defaultValue={data?.description}
                placeholder="Enter your description"
              />
              <Input
                {...register("description_2")}
                isDisabled={isLoading}
                label="Description 2"
                type="title"
                name="description_2"
                defaultValue={data?.description_2}
                size="lg"
                id="description_2"
                variant="underlined"
                placeholder="Enter your description 2"
              />
              <Label>cover_photo</Label>
              <ShadInput
                id="cover_photo"
                placeholder="cover_photo"
                {...register("cover_photo")}
                color="primary"
                className="flex h-[64px] items-center justify-center file:mt-1 file:rounded-large file:bg-primary file:px-4 file:py-2 file:text-white file:shadow-lg file:hover:cursor-pointer hover:file:bg-primary/90"
                type="file"
              />
              <Label>files</Label>
              <ShadInput
                id="files"
                placeholder="files"
                {...register("photos")}
                color="primary"
                className="flex h-[64px] items-center justify-center file:mt-1 file:rounded-large file:bg-primary file:px-4 file:py-2 file:text-white file:shadow-lg file:hover:cursor-pointer hover:file:bg-primary/90"
                type="file"
                multiple
              />
              {products && (
                <Select
                  items={products}
                  label="Products"
                  color="default"
                  selectionMode="multiple"
                  {...register("productId")}
                  variant="underlined"
                  placeholder="Select Products"
                >
                  {(product) => (
                    <SelectItem value={product._id} key={product._id}>
                      {product.title}
                    </SelectItem>
                  )}
                </Select>
              )}
              {features && (
                <Select
                  items={subproductFeatures}
                  label="Features"
                  color="default"
                  selectionMode="multiple"
                  {...register("featuresIds")}
                  variant="underlined"
                  placeholder="Select Features"
                >
                  {(feature) => (
                    <SelectItem value={feature._id} key={feature._id}>
                      {feature.title}
                    </SelectItem>
                  )}
                </Select>
              )}
              {data?.specifications && (
                <Select
                  items={data?.specifications}
                  label="Specifications"
                  color="default"
                  selectionMode="multiple"
                  {...register("specifications")}
                  variant="underlined"
                  placeholder="Select specifications"
                >
                  {(specification) => (
                    <SelectItem
                      value={specification._id}
                      key={specification._id}
                    >
                      {specification.key}
                    </SelectItem>
                  )}
                </Select>
              )}
              {data?.applicationIds && (
                <Select
                  items={data?.applicationIds}
                  label="Applications"
                  color="default"
                  selectionMode="multiple"
                  {...register("applicationIds")}
                  variant="underlined"
                  placeholder="Select applications"
                >
                  {(application) => (
                    <SelectItem value={application._id} key={application._id}>
                      {application.title}
                    </SelectItem>
                  )}
                </Select>
              )}
              <Button
                className="rounded-[8px]"
                size="lg"
                color="primary"
                type="submit"
                isLoading={isSubmitting}
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

export default ProjectsPage;

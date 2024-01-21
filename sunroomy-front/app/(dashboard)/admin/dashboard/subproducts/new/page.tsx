/* eslint-disable @next/next/no-img-element */
"use client";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import { Input as ShadInput } from "@/components/admin/ui/input";
import { IFeature, IProduct } from "@/types/types";
import { Button, Card, Input, Select, SelectItem } from "@nextui-org/react";
import { Label } from "@radix-ui/react-label";
import axios from "axios";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
const ProductsPage = ({ params }: { params: { id: string } }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FieldValues>();
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [features, setFeatures] = useState<IFeature[] | null>(null);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  const memoizedSession = useMemo(() => session, [session]);
  const subproductFeatures = features?.filter(
    (feature) => feature.subProductId
  );
  useEffect(() => {
    setIsLoading(true);
    const fetchProducts = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/`
      );
      setProducts(response.data);
      setIsLoading(false);
    };
    const fetchFeatures = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/admin/dashboard/features",
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          }
        );
        setFeatures(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };
    if (session?.user.token) {
      fetchFeatures();
      fetchProducts();
    }
  }, [session?.user.token]);

  const onSubmit: SubmitHandler<FieldValues> = async (data, event) => {
    setIsSubmitting(true)
    const postData = new FormData();
    for (let [key, values] of Object.entries(data)) {
      if (key === "photos") {
        for (let i = 0; i < data.photos.length; i++) {
          postData.append("photos", data.photos[i]);
        }
      } else if (key === "cover_photo") {
        postData.append("cover_photo", data.cover_photo[0]);
      } else {
        postData.append(key, values);
      }
    }

    setIsLoading(true);

    const res = await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/subproducts`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${memoizedSession?.user.token}`,
            "Content-Type":
              "multipart/form-data;boundary=------------------------",
          },
        }
      )
      .then((response) => {
        setIsSubmitting(false);
        toast.success("Successfully added product!");
        router.push("/admin/dashboard/subproducts");
        router.refresh();
      })
      .catch((err) => {
        if (err?.response?.status === 409) {
          toast.error("This product has already been added");
        }
        setIsSubmitting(false);
      });
  };

  return (
    <div className="container mt-6 mx-auto px-6 max-w-[1280px]">
      {isLoading ? (
        <div className="h-screen">
          <Preloader />
        </div>
      ) : (
        <PageWrapper>
          <h1 className="text-5xl">Create subproduct page</h1>
          <Card className="p-4 mt-8">
            <form
              className="flex flex-col gap-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                {...register("title")}
                isDisabled={isLoading}
                label="Title"
                type="title"
                name="title"
                size="lg"
                id="title"
                variant="underlined"
                placeholder="Enter your title"
              />
              <Input
                {...register("description")}
                isDisabled={isLoading}
                label="Description"
                type="title"
                name="description"
                size="lg"
                id="description"
                variant="underlined"
                placeholder="Enter your description"
              />
              <Input
                {...register("description_2")}
                isDisabled={isLoading}
                label="Description 2"
                type="title"
                name="description_2"
                size="lg"
                id="description_2"
                variant="underlined"
                placeholder="Enter your description 2"
              />
              <Label>cover_photo</Label>
              <ShadInput
                id="cover_photo"
                placeholder="cover_photo"
                {...register("cover_photo", { required: true })}
                color="primary"
                className="file:bg-primary flex items-center justify-center h-[64px] file:shadow-lg file:hover:cursor-pointer file:text-white hover:file:bg-primary/90 file:py-2 file:mt-1 file:px-4 file:rounded-large"
                type="file"
              />
              <Label>files</Label>
              <ShadInput
                id="files"
                placeholder="files"
                {...register("photos", { required: true })}
                color="primary"
                className="file:bg-primary flex items-center justify-center h-[64px] file:shadow-lg file:hover:cursor-pointer file:text-white hover:file:bg-primary/90 file:py-2 file:mt-1 file:px-4 file:rounded-large"
                type="file"
                multiple
              />
              {products && (
                <Select
                  items={products}
                  label="Products"
                  color="default"
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
                  {...register("featuresId")}
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

export default ProductsPage;
// {
//   "title": "Pergola",
//   "description": "Ante quis sed nibh cras. Ornare ullamcorper libero at elementum enim morbi pulvinar. Ac hendrerit nisl rhoncus nisl tempus. Ante quis sed nibh cras. Ornare ullamcorper libero at elementum enim morbi pulvinar. Ac hendrerit nisl",
//   "photo": "http://res.cloudinary.com/daxy3ke6i/image/upload/v1698132594/product_pergola.jpg.jpg",
//   "subProductIds": [
//       {
//           "_id": "6537bac26b3328b2aaca051f"
//       }
//   ]
// }

/* eslint-disable @next/next/no-img-element */
"use client";
import { PageWrapper } from "@/components/PageWrapper";
import { Input as ShadInput } from "@/components/admin/ui/input";
import { ISubProduct } from "@/types/types";
import { Button, Card, Input, Select, SelectItem } from "@nextui-org/react";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
const ProductsPage = ({ params }: { params: { id: string } }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const [subproducts, setSubproducts] = useState<ISubProduct[] | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();
  useEffect(() => {
    const fetchSubproducts = async () => {
      try {
        setIsLoading(true);

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/subproducts/`,
        );

        setSubproducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubproducts();
  }, []);
  const onSubmit: SubmitHandler<FieldValues> = async (data, event) => {
    const postData = {
      title: data.title,
      description: data.description,
      photo: data.file[0],
      subProductIds: data.subproducts || null,
      cover_photo: data.cover_photo[0],
    };

    setIsLoading(true);
    const res = await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/products`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then((response) => {
        setIsLoading(false);
        toast.success("Successfully added product!");
        router.push("/admin/dashboard/products");
        router.refresh();
      })
      .catch((err) => {
        if (err?.response?.status === 409) {
          toast.error("This product has already been added");
        }
        setIsLoading(false);
      });
  };
  return (
    <div className="container mx-auto mt-6 max-w-[1280px] px-6">
      <PageWrapper>
        <h1 className="text-5xl">Product data</h1>
        <Card className="mt-8 p-4">
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
            <Label>Page Photo</Label>
            <ShadInput
              id="file"
              placeholder="file"
              {...register("file")}
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
            {subproducts && (
              <Select
                items={subproducts}
                label="Subproducts"
                color="default"
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
            )}

            <Button
              className="rounded-[8px]"
              size="lg"
              color="primary"
              type="submit"
              isLoading={isLoading}
            >
              Submit
            </Button>
          </form>
        </Card>
      </PageWrapper>
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

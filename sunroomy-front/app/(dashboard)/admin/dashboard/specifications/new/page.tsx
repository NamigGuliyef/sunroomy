/* eslint-disable @next/next/no-img-element */
"use client";
import NotFoundPage from "@/app/(dashboard)/not-found";
import { PageWrapper } from "@/components/PageWrapper";
import { ISubProduct, ISubProducts } from "@/types/types";
import { Button, Card, Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Specifications = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subProducts, setSubProducts] = useState<ISubProduct[] | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_BACKEND_URL + "/subproducts")
      .then((res) => {
        setSubProducts(res.data);
      });
  }, []);
  const onSubmit: SubmitHandler<FieldValues> = async (
    formSubmitData,
    event,
  ) => {
    setLoading(true);

    const res = await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/specifications`,
        formSubmitData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token!}`,
          },
        },
      )
      .then((response) => {
        setLoading(false);
        toast.success("Successfully created specification!");
        // router.push("/admin/dashboard/needs");
      });
    //   .catch((err) => {
    //     if (err.response.status === 409) {
    //       toast.error("There's a project need with that name already!");
    //     }
    //     setLoading(false);
    //   });
  };
  if (error) return <NotFoundPage />;
  return (
    <div className="container mx-auto mt-6 max-w-[1280px] px-6">
      <PageWrapper>
        <h1 className="text-5xl">Create Specification</h1>
        <Card className="mt-8 p-4">
          <form
            className="flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              {...register("key")}
              label="Name"
              type="text"
              name="key"
              size="lg"
              id="key"
              variant="underlined"
              placeholder="Enter name of specification"
            />
            <Input
              {...register("value")}
              label="Description"
              type="text"
              name="value"
              size="lg"
              id="value"
              variant="underlined"
              placeholder="Enter value of specification"
            />
            {subProducts && (
              <Select
                items={subProducts}
                label="Subproducts"
                color="default"
                selectionMode="single"
                {...register("subProductId")}
                variant="underlined"
                placeholder="Select subproduct for specification"
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
              isLoading={loading}
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
  );
};

export default Specifications;

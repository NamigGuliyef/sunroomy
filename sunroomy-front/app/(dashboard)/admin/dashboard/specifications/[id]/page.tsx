/* eslint-disable @next/next/no-img-element */
"use client";
import NotFoundPage from "@/app/(dashboard)/not-found";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import {
  ISubProduct,
  ISubProductSpecification,
  ISubProducts,
} from "@/types/types";
import { Button, Card, Input, Select, SelectItem } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Specifications = ({ params }: { params: { id: string } }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [specsData, setSpecsData] = useState<ISubProductSpecification | null>(
    null,
  );
  const [subProducts, setSubProducts] = useState<ISubProduct[] | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subProductsRes, specsRes] = await Promise.all([
          axios.get(process.env.NEXT_PUBLIC_BACKEND_URL + "/subproducts"),
          axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/specifications/${params.id}`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.token!}`,
              },
            },
          ),
        ]);

        setSubProducts(subProductsRes.data);
        setSpecsData(specsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(true);
      }
    };
    if (session?.user.token) {
      fetchData().finally(() => {
        setLoading(false);
      });
    }
  }, [session?.user.token, params.id]);

  const onSubmit: SubmitHandler<FieldValues> = async (
    formSubmitData,
    event,
  ) => {
    setSubmitLoading(true);
    if (
      formSubmitData.key === specsData?.key &&
      formSubmitData.value === specsData?.value
    ) {
      toast.error("Data is the same!");
      setSubmitLoading(false);
      return;
    }

    const postData = { ...formSubmitData };

    if (postData.key === specsData?.key) {
      delete postData.key;
    }
    if (postData.value === specsData?.value) {
      delete postData.value;
    }

    const res = await axios
      .patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/specifications/${params.id}`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token!}`,
          },
        },
      )
      .then((response) => {
        setSubmitLoading(false);
        router.push("../specifications");
        toast.success("Successfully edited specification!");
      });
  };
  if (error) {
    notFound();
  }
  return (
    <>
      {!specsData ? (
        <div className="h-screen">
          <Preloader />
        </div>
      ) : (
        <div className="container mx-auto mt-6 max-w-[1280px] px-6">
          <PageWrapper>
            <h1 className="text-5xl">Edit Specification</h1>
            <Card className="mt-8 p-4">
              <form
                className="flex flex-col gap-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                {specsData && (
                  <>
                    <Input
                      {...register("key")}
                      label="Name"
                      defaultValue={specsData?.key}
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
                      defaultValue={specsData?.value}
                      size="lg"
                      id="value"
                      variant="underlined"
                      placeholder="Enter value of specification"
                    />
                  </>
                )}
                <Button
                  className="rounded-[8px]"
                  size="lg"
                  isLoading={submitLoading}
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

export default Specifications;

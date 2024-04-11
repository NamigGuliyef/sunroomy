"use client";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import { IFollowUsLink, IHomePageHero } from "@/types/types";
import { Button, Card, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input as ShadInput } from "@/components/admin/ui/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
const UpdateFollowUsLink = ({ params }: { params: { id: string } }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFollowUsLink>();
  const [loading, setLoading] = useState(false);
  const [followUsData, setFollowUsData] = useState<null | IFollowUsLink>(null);
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    const fetchFollowUs = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/followUs/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          },
        );

        setFollowUsData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user.token) {
      fetchFollowUs();
    }
  }, [session?.user.token, params.id]);
  const onSubmit: SubmitHandler<IFollowUsLink> = async (formSubmitData) => {
    if (
      formSubmitData.link === followUsData?.link &&
      formSubmitData.name === followUsData.name
    ) {
      toast.error("data is the same");
      return;
    }
    try {
      setLoading(true);
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/followUs/${params.id}`,
        formSubmitData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token!}`,
          },
        },
      );
      toast.success("Successfully updated links!");
      router.push("/admin/dashboard/follow-us");
    } catch (error) {
      console.error("Error updating links:", error);
      toast.error("Error updating links.");
    } finally {
      setLoading(false);
    }
  };
  if (loading || followUsData === null) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Preloader />
      </div>
    );
  }
  return (
    <>
      <div className="container mx-auto mt-6 max-w-[1280px] px-6">
        <PageWrapper>
          <h1 className="text-5xl">Update follow us link</h1>
          <Card className="mt-8 p-4">
            <form
              className="flex flex-col gap-8"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                {...register("name")}
                label="Enter your title"
                type="text"
                name="name"
                defaultValue={followUsData.name}
                className="w-11/12"
                size="lg"
                variant="underlined"
                placeholder="Example: instagram"
              />
              <Input
                {...register("link")}
                label="Enter your link"
                type="text"
                name="link"
                defaultValue={followUsData.link}
                className="w-11/12"
                size="lg"
                variant="underlined"
                placeholder="Example: https://instagram.com/sunroomy"
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
      </div>
    </>
  );
};

export default UpdateFollowUsLink;

"use client";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import { Button, Card, Input } from "@nextui-org/react";
import axios from "axios";
import { Edit2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { IAboutUs } from "@/types/types";
import { useRouter } from "next/navigation";

const AboutUsPage = () => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [aboutUsData, setAboutUsData] = useState<IAboutUs[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [isEditingYears, setIsEditingYears] = useState(false);
  const [isEditingProducts, setIsEditingProducts] = useState(false);
  const [isEditingPartners, setIsEditingPartners] = useState(false);
  const router = useRouter();
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/about-us`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        },
      );
      console.log(res.data);
      setAboutUsData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [session?.user.token]);

  useEffect(() => {
    if (session?.user.token) {
      fetchData();
    }
  }, [session?.user.token, fetchData]);

  const onSubmit: SubmitHandler<FieldValues> = async (formSubmitData) => {
    try {
      setLoading(true);
      let shouldSubmit = true;
      if (
        !formSubmitData.description &&
        !formSubmitData.product_systems &&
        !formSubmitData.years_of_experience &&
        !formSubmitData.partners
      ) {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
          >
            <div className="w-0 flex-1 p-4">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    No changes detected. Nothing was submitted.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ));
        return;
      }
      if (
        formSubmitData.description.length === 0 &&
        formSubmitData.product_systems.length === 0 &&
        formSubmitData.years_of_experience.length === 0 &&
        formSubmitData.partners.length === 0
      ) {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
          >
            <div className="w-0 flex-1 p-4">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    No changes detected. Nothing was submitted.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        ));
        shouldSubmit = false;
        return;
      }
      if (shouldSubmit === true) {
        const postData = {
          description: formSubmitData.description,
          years_of_experience: formSubmitData.years_of_experience,
          product_systems: formSubmitData.product_systems,
          partners: formSubmitData.partners,
        };

        await axios.patch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/about-us/${
            aboutUsData && aboutUsData[0]._id
          }`,
          postData,
          {
            headers: {
              Authorization: `Bearer ${session?.user.token!}`,
            },
          },
        );

        toast.success("Successfully updated about!");
        setLoading(true);
        router.push("../dashboard");
      }
    } catch (error) {
      console.error("Error updating about:", error);
      toast.error("Error updating about.");
    } finally {
      setLoading(false);
      setIsEditingDescription(false);
      setIsEditingPartners(false);
      setIsEditingProducts(false);
      setIsEditingYears(false);
    }
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
            <h1 className="text-5xl">Update About Us Page</h1>
            <Card className="mt-8 p-4">
              <form
                className="flex flex-col gap-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex items-end gap-4">
                  <Input
                    {...register("description")}
                    isDisabled={loading || !isEditingDescription}
                    label="Description"
                    type="text"
                    name="description"
                    size="lg"
                    variant="underlined"
                    defaultValue={aboutUsData && aboutUsData[0]?.description}
                    placeholder="Enter your description"
                  />
                  <Button
                    className="w-1/12 rounded-[8px]"
                    size="lg"
                    onClick={() =>
                      setIsEditingDescription(!isEditingDescription)
                    }
                    color="primary"
                  >
                    Edit
                    <Edit2Icon size={14} />
                  </Button>
                </div>
                <div className="flex items-end gap-4">
                  <Input
                    {...register("years_of_experience")}
                    isDisabled={loading || !isEditingYears}
                    label="Years of Experience"
                    type="number"
                    name="years_of_experience"
                    size="lg"
                    variant="underlined"
                    defaultValue={
                      aboutUsData &&
                      aboutUsData[0].years_of_experience?.toString()
                    }
                    placeholder="Enter your years of experience"
                  />
                  <Button
                    className="w-1/12 rounded-[8px]"
                    size="lg"
                    onClick={() => setIsEditingYears(!isEditingYears)}
                    color="primary"
                  >
                    Edit
                    <Edit2Icon size={14} />
                  </Button>
                </div>
                <div className="flex items-end gap-4">
                  <Input
                    {...register("product_systems")}
                    isDisabled={loading || !isEditingProducts}
                    label="Product Systems"
                    type="text"
                    name="product_systems"
                    size="lg"
                    variant="underlined"
                    defaultValue={
                      aboutUsData && aboutUsData[0]?.product_systems?.toString()
                    }
                    placeholder="Enter your product systems count"
                  />
                  <Button
                    className="w-1/12 rounded-[8px]"
                    size="lg"
                    onClick={() => setIsEditingProducts(!isEditingProducts)}
                    color="primary"
                  >
                    Edit
                    <Edit2Icon size={14} />
                  </Button>
                </div>
                <div className="flex items-end gap-4">
                  <Input
                    {...register("partners")}
                    isDisabled={loading || !isEditingPartners}
                    label="Partners"
                    type="text"
                    name="partners"
                    size="lg"
                    variant="underlined"
                    defaultValue={aboutUsData[0]?.partners?.toString()}
                    placeholder="Enter your description"
                  />
                  <Button
                    className="w-1/12 rounded-[8px]"
                    size="lg"
                    onClick={() => setIsEditingPartners(!isEditingPartners)}
                    color="primary"
                  >
                    Edit
                    <Edit2Icon size={14} />
                  </Button>
                </div>
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

export default AboutUsPage;

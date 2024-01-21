/* eslint-disable @next/next/no-img-element */
"use client";
import NotFoundPage from "@/app/(dashboard)/not-found";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import { Input as ShadInput } from "@/components/admin/ui/input";
import { IFeature, IProjectNeed, IUsedProduct } from "@/types/types";
import {
  Button,
  Card,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ProjectsPage = () => {
  const [needs, setNeeds] = useState<IProjectNeed[] | null>(null);
  const [features, setFeatures] = useState<IFeature[] | null>(null);
  const [usedProducts, setUsedProducts] = useState<IUsedProduct[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedType, setSelectedType] = useState("Home");

  const projectFeatures = features?.filter((feature) => feature.projectId);
  const { data: session, status } = useSession();
  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/admin/dashboard/projectneeds",
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          },
        );
        setNeeds(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };
    const fetchFeatures = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/admin/dashboard/features",
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          },
        );
        setFeatures(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };
    const fetchUsedProducts = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/admin/dashboard/usedproducts",
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          },
        );
        setUsedProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };
    if (session?.user.token) {
      fetchNeeds();
      fetchUsedProducts();
      fetchFeatures();
      setLoading(false);
    }
  }, [session?.user.token]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (
    formSubmitData,
    event,
  ) => {
    formSubmitData.type = selectedType;
    setLoading(true);

    const postData = new FormData();
    for (let [key, value] of Object.entries(formSubmitData)) {
      if (key === "photos" && value && value.length >= 1) {
        for (let i = 0; i < value.length; i++) {
          postData.append("photos", value[i]);
        }
      } else if (key !== "photos" && (value !== null || value.length > 0)) {
        postData.append(key, value);
      }
    }

    const res = await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/projects/`,
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
        toast.success("Successfully created project!");
      })
      .catch((err) => {
        if (err.response.status === 409) {
          toast.error("There's a project with that name already!");
        }
        setLoading(false);
      });
  };

  if (error) return <NotFoundPage />;
  return (
    <div className="container mx-auto mt-6 max-w-[1280px] px-6">
      <PageWrapper>
        <h1 className="text-5xl">Project data</h1>
        {loading && <Preloader />}
        <Card className="mt-8 p-4">
          <form
            className="flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              {...register("title")}
              isDisabled={loading}
              label="Title"
              type="text"
              name="title"
              size="lg"
              id="title"
              variant="underlined"
              placeholder="Enter your title"
            />
            <Input
              {...register("description")}
              isDisabled={loading}
              label="Description"
              type="text"
              name="description"
              size="lg"
              id="description"
              variant="underlined"
              placeholder="Enter your description"
            />
            <Input
              {...register("used_products_joint")}
              isDisabled={loading}
              label="Used products joint"
              type="text"
              name="used_products_joint"
              size="lg"
              id="used_products_joint"
              variant="underlined"
              placeholder="Enter your used products joint"
            />
            <Input
              {...register("location")}
              isDisabled={loading}
              label="location"
              type="text"
              name="location"
              size="lg"
              id="location"
              variant="underlined"
              placeholder="Enter your location"
            />
            {needs && (
              <Select
                items={needs}
                label="Needs"
                isDisabled={loading}
                color="default"
                selectionMode="single"
                {...register("needsId")}
                variant="underlined"
                placeholder="Select needs"
              >
                {(need) => (
                  <SelectItem value={need._id} key={need._id}>
                    {need.title}
                  </SelectItem>
                )}
              </Select>
            )}
            {/* {projectFeatures && (
              <Select
                items={projectFeatures}
                label="Features"
                isDisabled={loading}
                color="default"
                selectionMode="single"
                {...register("featuresId")}
                variant="underlined"
                placeholder="Select features"
              >
                {(feature) => (
                  <SelectItem value={feature._id} key={feature._id}>
                    {feature.title}
                  </SelectItem>
                )}
              </Select>
            )} */}
            {usedProducts && (
              <Select
                items={usedProducts}
                label="Used Products"
                isDisabled={loading}
                color="default"
                selectionMode="single"
                {...register("usedProductsId")}
                variant="underlined"
                placeholder="Select used products"
              >
                {(usedProduct) => (
                  <SelectItem value={usedProduct._id} key={usedProduct._id}>
                    {usedProduct.title}
                  </SelectItem>
                )}
              </Select>
            )}
            <RadioGroup
              orientation="horizontal"
              isDisabled={loading}
              label="Select type of project"
              value={selectedType}
              onValueChange={setSelectedType}
            >
              <Radio value="Home">Home</Radio>
              <Radio value="Business">Business</Radio>
            </RadioGroup>
            <ShadInput
              id="file"
              placeholder="file"
              {...register("photos")}
              disabled={loading}
              color="primary"
              required={false}
              className="flex h-[64px] items-center justify-center file:mt-1 file:rounded-large file:bg-primary file:px-4 file:py-2 file:text-white file:shadow-lg file:hover:cursor-pointer hover:file:bg-primary/90"
              type="file"
              multiple
            />

            <Button
              className="rounded-[8px]"
              size="lg"
              color="primary"
              isLoading={loading}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Card>
      </PageWrapper>
    </div>
  );
};

export default ProjectsPage;

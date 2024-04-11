/* eslint-disable @next/next/no-img-element */
"use client";
import NotFoundPage from "@/app/(dashboard)/not-found";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import { Input as ShadInput } from "@/components/admin/ui/input";
import {
  IFeature,
  IProject,
  IProjectNeed,
  ISubProductFeature,
  IUsedProduct,
} from "@/types/types";
import {
  Button,
  Card,
  Input,
  RadioGroup,
  Radio,
  Select,
  SelectItem,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ProjectsPage = ({ params }: { params: { slug: string } }) => {
  const [data, setData] = useState<IProject | null>(null);
  const [needs, setNeeds] = useState<IProjectNeed[] | null>(null);
  const [features, setFeatures] = useState<IFeature[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [usedProducts, setUsedProducts] = useState<IUsedProduct[] | null>(null);
  const [selectedType, setSelectedType] = useState(data?.type);
  const projectFeatures = features?.filter((feature) => feature.projectId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>();
  const { data: session, status } = useSession();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [
          projectResponse,
          needsResponse,
          featuresResponse,
          usedProductsResponse,
        ] = await Promise.all([
          axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${params.slug}`,
          ),
          axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/projectneeds`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.token}`,
              },
            },
          ),
          axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/features`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.token}`,
              },
            },
          ),
          axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/projectneeds`,
            {
              headers: {
                Authorization: `Bearer ${session?.user.token}`,
              },
            },
          ),
        ]);

        setData(projectResponse.data);
        setNeeds(needsResponse.data);
        setFeatures(featuresResponse.data);
        setUsedProducts(usedProductsResponse.data);
        if (projectResponse.data) {
          setSelectedType(projectResponse.data.type);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };

    if (session?.user.token) {
      fetchData();
    }
  }, [session?.user.token, params.slug]);
  // if (data) {
  //   setValue("title", data.title);
  //   setValue("description", data.description);
  //   setValue("used_products_joint", data.used_products_joint);
  // }
  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = async (
    formSubmitData,
    event,
  ) => {
    const postData = new FormData();
    for (let [key, value] of Object.entries(formSubmitData)) {
      if (key === "photos" && value && value.length > 1) {
        for (let i = 0; i < value.length; i++) {
          postData.append("photos", value[i]);
        }
      } else if (key === "title" && value === data?.title) {
        postData.delete("title");
      } else if (key === "description" && value === data?.description) {
        postData.delete("description");
      } else if (key !== "photos" && value != null && value !== "") {
        postData.append(key, value);
      }
    }

    const res = await axios
      .patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/projects/${data?._id}`,
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
        toast.success("Successfully updated project!");
        router.push("/admin/dashboard/projects");
      })
      .catch((err) => {
        if (err.response.status === 409) {
          toast.error("There's a project with that name already!");
        }
        setLoading(false);
      });
  };

  if (error) {
    notFound();
  }
  return (
    <div className="container mx-auto mt-6 max-w-[1280px] px-6">
      {loading ? (
        <div className="h-screen">
          <Preloader />
        </div>
      ) : (
        <PageWrapper>
          <h1 className="text-5xl">Project data</h1>
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
                defaultValue={data?.title!}
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
                defaultValue={data?.description!}
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
                defaultValue={data?.used_products_joint!}
                id="used_products_joint"
                variant="underlined"
                placeholder="Enter your used products joint"
              />
              <Input
                {...register("location")}
                isDisabled={loading}
                label="location"
                type="text"
                defaultValue={data?.location!}
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
              {projectFeatures && (
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
              )}
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
                <Radio value="Commerical">Commerical</Radio>
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
      )}
    </div>
  );
};

export default ProjectsPage;

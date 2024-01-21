/* eslint-disable @next/next/no-img-element */
"use client";
import { PageWrapper } from "@/components/PageWrapper";
import { Input as ShadInput } from "@/components/admin/ui/input";
import { IProject, ISubProduct, ISubProductFeature } from "@/types/types";
import {
  Button,
  Card,
  Input,
  Select,
  SelectItem,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ProductsPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [subproducts, setSubproducts] = useState<ISubProduct[] | null>(null);
  const [projects, setProjects] = useState<IProject[] | null>(null);
  const [featureData, setFeatureData] = useState<ISubProductFeature | null>(
    null
  );
  const { data: session, status } = useSession();
  const [selected, setSelected] = useState("project");
  const params = useParams<{ id: string }>();
  useEffect(() => {
    setIsLoading(true);
    const fetchFeatureData = async () => {
      const response = await axios
        .get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/features/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.token!}`,
            },
          }
        )
        .then((res) => {
          setFeatureData(res.data);
          setIsLoading(false);
        });
    };
    const fetchSubproducts = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/subproducts/`
      );
      setSubproducts(response.data);
      setIsLoading(false);
    };
    const fetchProjects = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/`
      );
      setProjects(response.data);
      setIsLoading(false);
    };
    if (session?.user.token) {
      fetchFeatureData();
      fetchSubproducts();
      fetchProjects();
    }
  }, [session?.user.token, params.id]);

  const onSubmit: SubmitHandler<FieldValues> = async (data, event) => {
    const postSubProductFeature = {
      title:
        data.title === featureData?.title ? featureData?.title : data.title,
      description:
        data.description === featureData?.description ? featureData?.description : data.description,
      icon: (data?.file && data?.file[0]) || null,
      subProductId: data.subproducts || null,
    };
    const postProjectFeature = {
      title:
        data.title === featureData?.title ? featureData?.title : data.title,
      description:
        data.description === featureData?.description
          ? featureData?.title
          : data.description,
      projectId: data.projectId || null,
    };
    setIsLoading(true);
    const postData =
      selected === "project" ? postProjectFeature : postSubProductFeature;
    const res = await axios
      .patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/features/${params.id}`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        setIsLoading(false);
        toast.success("Successfully added product!");
        router.push("/admin/dashboard/products");
      })
      .catch((err) => {
        if (err?.response?.status === 409) {
          toast.error("This product has already been added");
        }
        setIsLoading(false);
      });
  };

  return (
    <div className="container mt-6 mx-auto px-6 max-w-[1280px]">
      <PageWrapper>
        <h1 className="text-5xl">Create feature</h1>
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
              defaultValue={featureData?.title}
              variant="underlined"
              placeholder="Enter your title"
            />
            <Input
              {...register("description")}
              isDisabled={isLoading}
              label="Description"
              type="title"
              name="description"
              defaultValue={featureData?.description}
              size="lg"
              id="description"
              variant="underlined"
              placeholder="Enter your description"
            />
            <RadioGroup
              label="Select feature type:"
              value={selected}
              onValueChange={setSelected}
            >
              <Radio value="project">Project</Radio>
              <Radio value="subproduct">Subproduct</Radio>
            </RadioGroup>
            {selected === "subproduct" ? (
              <>
                <ShadInput
                  id="file"
                  placeholder="file"
                  {...register("file")}
                  color="primary"
                  className="file:bg-primary flex items-center justify-center h-[64px] file:shadow-lg file:hover:cursor-pointer file:text-white hover:file:bg-primary/90 file:py-2 file:mt-1 file:px-4 file:rounded-large"
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
              </>
            ) : (
              <>
                {projects && (
                  <Select
                    items={projects!}
                    label="Projects"
                    color="default"
                    {...register("projectId")}
                    variant="underlined"
                    placeholder="Select project"
                  >
                    {(project) => (
                      <SelectItem value={project._id} key={project._id}>
                        {project.title}
                      </SelectItem>
                    )}
                  </Select>
                )}
              </>
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

export default ProductsPage;

"use client";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import { Input as ShadInput } from "@/components/admin/ui/input";
import {
  Avatar,
  Button,
  Card,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { Edit2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { IInspire } from "@/types/types";

const InspirePage = () => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [inspireData, setInspireData] = useState<IInspire[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [uploadMode, setUploadMode] = useState("upload");
  const [selectedPhotos, setSelectedPhotos] = useState([""]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/letUs-inspire-you`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          },
        );

        setInspireData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user.token) {
      fetchData();
    }
  }, [session?.user.token]);
  const onSubmit: SubmitHandler<FieldValues> = async (formSubmitData) => {
    try {
      setLoading(true);
      const postData = new FormData();
      formSubmitData;

      if (formSubmitData?.title?.length > 0) {
        postData.append("title", formSubmitData.title);
      } else {
        postData.append("title", inspireData[0].title);
      }
      if (formSubmitData?.description?.length > 0) {
        postData.append("description", formSubmitData.description);
      } else {
        postData.append("description", inspireData[0].description);
      }

      if (formSubmitData.photos && formSubmitData.photos.length > 1) {
        for (let i = 0; i < formSubmitData.photos.length; i++) {
          postData.append("photos", formSubmitData.photos[i]);
        }
      } else if (selectedPhotos.length > 1) {
        for (let i = 0; i < selectedPhotos.length; i++) {
          postData.append("photos", selectedPhotos[i]);
        }
      }
      await axios.patch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/admin/dashboard/letUs-inspire-you/${
          inspireData && inspireData[0]._id
        }`,
        postData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token!}`,
          },
        },
      );

      toast.success("Successfully updated about!");
    } catch (error) {
      console.error("Error updating about:", error);
      toast.error("Error updating about.");
    } finally {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/letUs-inspire-you`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          },
        );
        setInspireData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data.");
      } finally {
        setLoading(false);
        setIsEditingDescription(false);
        setIsEditingTitle(false);
      }
    }
  };
  const handleSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = e.target.value.split(",");
    selectedValues;
    setSelectedPhotos(selectedValues);
  };
  let mappedPhotos;
  if (inspireData && inspireData[0] && inspireData[0].photos) {
    mappedPhotos = inspireData[0].photos.map((photo, index) => ({
      id: index,
      photo: photo,
    }));
  }

  return (
    <>
      <div className="container mx-auto mt-6 max-w-[1280px] px-6">
        {loading ? (
          <div className="h-screen">
            <Preloader />
          </div>
        ) : (
          <PageWrapper>
            <h1 className="text-5xl">Update Inspire Page</h1>
            <Card className="mt-8 p-4">
              <form
                className="flex flex-col gap-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex items-end gap-4">
                  <Input
                    {...register("title")}
                    isDisabled={loading || !isEditingTitle}
                    label="Title"
                    type="title"
                    name="title"
                    className="w-11/12"
                    size="lg"
                    variant="underlined"
                    defaultValue={inspireData[0].title}
                    placeholder="Enter your title"
                  />
                  <Button
                    className="w-1/12 rounded-[8px]"
                    size="lg"
                    color="primary"
                    onClick={() => setIsEditingTitle(!isEditingTitle)}
                  >
                    Edit
                    <Edit2Icon size={14} />
                  </Button>
                </div>

                <div className="flex items-end gap-4">
                  <Input
                    {...register("description")}
                    isDisabled={loading || !isEditingDescription}
                    label="Description"
                    type="description"
                    name="description"
                    size="lg"
                    variant="underlined"
                    defaultValue={inspireData[0].description}
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
                <RadioGroup
                  label="Select change type:"
                  value={uploadMode}
                  onValueChange={setUploadMode}
                >
                  <Radio value="order">Order</Radio>
                  <Radio value="upload">Upload</Radio>
                </RadioGroup>
                {uploadMode === "upload" ? (
                  <>
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
                  </>
                ) : (
                  <Select
                    items={mappedPhotos}
                    label="Assigned to"
                    className="max-w-xs"
                    variant="bordered"
                    selectionMode="multiple"
                    onChange={handleSelectionChange}
                    classNames={{
                      value: "flex",
                      label: "group-data-[filled=true]:-translate-y-5",
                      trigger: "min-h-unit-16",
                      listboxWrapper: "max-h-[400px]",
                    }}
                    listboxProps={{
                      itemClasses: {
                        base: [
                          "rounded-md",
                          "text-default-500",
                          "transition-opacity",
                          "data-[hover=true]:text-foreground",
                          "data-[hover=true]:bg-default-100",
                          "dark:data-[hover=true]:bg-default-50",
                          "data-[selectable=true]:focus:bg-default-50",
                          "data-[pressed=true]:opacity-70",
                          "data-[focus-visible=true]:ring-default-500",
                        ],
                      },
                    }}
                    popoverProps={{
                      classNames: {
                        base: "before:bg-default-200",
                        content:
                          "p-0 border-small border-divider bg-background",
                      },
                    }}
                  >
                    {(photo) => (
                      <SelectItem
                        key={photo.photo}
                        value={photo.photo}
                        textValue={photo.photo}
                      >
                        <div className="flex items-center gap-2">
                          <Avatar
                            alt={photo.photo}
                            className="flex-shrink-0"
                            size="sm"
                            src={photo.photo}
                          />
                          <div className="flex flex-col">
                            <span className="text-small">
                              {"Photo" + photo.id}
                            </span>
                          </div>
                        </div>
                      </SelectItem>
                    )}
                  </Select>
                  // <Select
                  //   items={mappedPhotos}
                  //   variant="bordered"
                  //   onChange={handleSelectionChange}
                  //   selectionMode="multiple"
                  //   placeholder="Select subproduct"
                  //   className="max-w-xs"
                  //   aria-label="Select subproduct"
                  // >
                  //   {(photo) => (
                  //     <SelectItem key={photo.id} value={photo.photo}>
                  //       {photo.photo}
                  //     </SelectItem>
                  //   )}
                  // </Select>
                )}
                {/* Photo Input - You can add your logic for handling photos here */}

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

export default InspirePage;

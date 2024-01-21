"use client";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import { IContact } from "@/types/types";
import { Button, Card, Input, useDisclosure } from "@nextui-org/react";
import axios from "axios";
import { Edit2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
const ContactPage = () => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const [contactData, setContactData] = useState<IContact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isEditingMapLink, setIsEditingMapLink] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/contacts`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          },
        );

        setContactData(res.data);
        console.log(res.data);
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

      const formData = new FormData();

      if (isEditingTitle && formSubmitData.title !== contactData[0]?.title) {
        formData.append("title", formSubmitData.title || "");
      }

      if (
        isEditingLocation &&
        formSubmitData.location !== contactData[0]?.location
      ) {
        formData.append("location", formSubmitData.location || "");
      }

      if (isEditingEmail && formSubmitData.email !== contactData[0]?.email) {
        formData.append("email", formSubmitData.email || "");
      }

      if (isEditingPhone && formSubmitData.phone !== contactData[0]?.phone) {
        formData.append("phone", formSubmitData.phone || "");
      }

      if (
        isEditingMapLink &&
        formSubmitData.mapLink !== contactData[0]?.mapLink
      ) {
        formData.append("mapLink", formSubmitData.mapLink || "");
      }

      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/contacts/${
          contactData && contactData[0]?._id
        }`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token!}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success("Successfully updated contact data!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          `Error updating contact data. ${error.response?.data?.message}`,
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const renderEditableInput = (
    label: string,
    name: string,
    isEditing: boolean,
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
    defaultValue: string,
  ) => {
    return (
      <div className="flex items-end gap-4" key={name}>
        <Input
          {...register(name)}
          isDisabled={loading || !isEditing}
          label={label}
          type={name}
          name={name}
          className="w-11/12"
          size="lg"
          variant="underlined"
          defaultValue={defaultValue}
          placeholder={`Enter your ${name}`}
        />
        <Button
          className="w-1/12 rounded-[8px]"
          size="lg"
          color="primary"
          onClick={() => setIsEditing(!isEditing)}
        >
          Edit
          <Edit2Icon size={14} />
        </Button>
      </div>
    );
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
            <h1 className="text-5xl">Update Contact Data</h1>
            <Card className="mt-8 p-4">
              <form
                className="flex flex-col gap-8"
                onSubmit={handleSubmit(onSubmit)}
              >
                {renderEditableInput(
                  "Title",
                  "title",
                  isEditingTitle,
                  setIsEditingTitle,
                  contactData[0]?.title || "",
                )}

                {renderEditableInput(
                  "Location",
                  "location",
                  isEditingLocation,
                  setIsEditingLocation,
                  contactData[0]?.location || "",
                )}

                {renderEditableInput(
                  "Email",
                  "email",
                  isEditingEmail,
                  setIsEditingEmail,
                  contactData[0]?.email || "",
                )}

                {renderEditableInput(
                  "Phone",
                  "phone",
                  isEditingPhone,
                  setIsEditingPhone,
                  contactData[0]?.phone || "",
                )}

                {renderEditableInput(
                  "Map Link",
                  "mapLink",
                  isEditingMapLink,
                  setIsEditingMapLink,
                  contactData[0]?.mapLink || "",
                )}

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
export default ContactPage;

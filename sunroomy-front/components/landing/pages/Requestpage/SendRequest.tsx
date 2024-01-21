"use client";
import useRequestProperties from "@/hooks/useRequestProperties";
import axios from "axios";
import { Form, Formik, FormikFormProps } from "formik";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoChevronForwardSharp } from "react-icons/io5";
import * as Yup from "yup";
import RequestPersonal from "./RequestPersonal";
import RequestProjectInfo from "./RequestProjectInfo";
import Preloader from "@/components/admin/Preloader";

export interface MyFormProps extends FormikFormProps {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  country: string;
  files: any;
  state: string;
  city: string;
  zipcode: string;
  main_structure_model: string;
  width_in_feet: number;
  projection_in_feet: number;
  height_in_feet: number;
  structure_situation: string;
  structure_color: string;
  window_and_doors: string;
  sunscreens: string;
  project_details: string;
  about_us: string;
  countryCode: string;
  number: string;
}
const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  phone_number: Yup.string().required("Number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  zipcode: Yup.string().required("Zip code is required"),
  main_structure_model: Yup.string().required("Please select one"),
  width_in_feet: Yup.number()
    .min(1, "Must be greater than 0")
    .required("This field is required"),
  projection_in_feet: Yup.number()
    .min(1, "Must be greater than 0")
    .required("This field is required"),
  height_in_feet: Yup.number()
    .min(1, "Must be greater than 0")
    .required("This field is required"),
  structure_situation: Yup.string().required("This field is required"),
  structure_color: Yup.string().required("This field is required"),
  // window_and_doors: Yup.array().required("This field is required"),
  sunscreens: Yup.array().required("This field is required"),
  project_details: Yup.string().required("This field is required"),
  about_us: Yup.string().required("This field is required"),
  countryCode: Yup.string().required("This field is required"),
});
const initialValues = {
  first_name: "",
  last_name: "",
  phone_number: "",
  email: "",
  country: "",
  files: "",
  state: "",
  city: "",
  zipcode: "",
  main_structure_model: "",
  width_in_feet: 0,
  projection_in_feet: 0,
  height_in_feet: 0,
  structure_situation: "",
  structure_color: "",
  window_and_doors: "",
  sunscreens: "",
  project_details: "",
  about_us: "",
  countryCode: "",
  number: "",
};

const SendRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { width, height, projection } = useRequestProperties();
  const handleSubmit = async (form: MyFormProps) => {
    setIsLoading(true);
    const postData = {
      first_name: form.first_name,
      last_name: form.last_name,
      phone_number: form.countryCode + form.phone_number,
      email: form.email,
      country: form.country,
      state: form.state,
      city: form.city,
      files: form.files,
      zipcode: form.zipcode,
      main_structure_model: form.main_structure_model,
      width_in_feet: form.width_in_feet,
      projection_in_feet: form.projection_in_feet,
      height_in_feet: form.height_in_feet,
      structure_situation: form.structure_situation,
      structure_color: form.structure_color,
      window_and_doors: form.window_and_doors,
      sunscreens: form.sunscreens,
      project_details: form.project_details,
      about_us: form.about_us,
    };
    console.log(postData);
    const formData = new FormData();

    for (const [key, value] of Object.entries(postData)) {
      console.log(`${key}: ${value}`);
      if (key === "files") {
        for (let i = 0; i < postData.files.length; i++) {
          formData.append("files", postData.files[i]);
        }
      } else {
        formData.append(key, value);
      }
    }
    const res = await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/request-project`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then((res) => {
        if (res.status === 201) {
          toast.success("Successfully sent message!");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="container relative flex flex-col gap-6 px-6 lg:px-0 xl:flex-row">
      {isLoading && (
        <div className="absolute z-20 h-full w-full ">
          <Preloader />
        </div>
      )}
      <div className="relative min-h-[327px] w-full overflow-hidden rounded-2.5xl bg-[#E1E2E4] lg:p-5 xl:min-h-[879px] xl:w-1/2 xl:max-w-[50%]">
        <div className="relative flex h-full max-h-[327px] items-center justify-between gap-12 md:max-h-full xl:flex-col xl:gap-0">
          <div className="mx-auto hidden lg:block lg:h-1/2 lg:w-[90%]">
            <Image
              src="/images/request-page/3d.png"
              alt="Hero Image"
              quality={75}
              width={500}
              height={500}
              className="relative z-10 mx-auto xl:mt-8"
            />
          </div>
          <div className="relative mx-auto flex w-full flex-col items-center justify-center rounded-2.5xl bg-white md:max-h-[420px] lg:h-1/2 xl:mb-1 xl:max-h-max xl:w-[98%]">
            <Image
              src="/images/request-page/model.png"
              alt="Hero Image"
              quality={75}
              width={500}
              height={500}
              className="relative z-10 mx-auto mt-8 hidden h-auto w-full lg:block lg:w-[70%] xl:w-[70%]"
            />
            <Image
              src="/images/request-page/Image.png"
              alt="Hero Image"
              quality={75}
              width={500}
              height={500}
              className="relative z-10 mx-auto block h-full w-full lg:hidden xl:mt-8"
            />
            <div className="absolute bottom-[4%] left-[18%] z-10 hidden w-[72px] -skew-x-[37deg] skew-y-[25deg] transform font-black lg:block xl:bottom-[23%] xl:left-[23%]">
              Width
              <br />
              {width}`<span className="font-normal">feet</span>
            </div>
            <div className="absolute bottom-[18%] right-[10%] z-10 hidden w-[72px] -skew-x-[25deg] skew-y-[17deg] transform font-black lg:block xl:bottom-[32%] xl:right-[13%]">
              Projection
              <br />
              {projection}`<span className="font-normal">feet</span>
            </div>
            <div className="absolute right-[3%] top-[42%] z-10 hidden w-[72px] -skew-x-[9deg] skew-y-[20deg] transform font-black lg:block xl:right-[6%]">
              Height
              <br />
              {height}`<span className="font-normal">feet</span>
            </div>
            <div className="absolute left-4 top-4 hidden h-2 w-2 rounded-full bg-[#E1E2E4] lg:block"></div>
            <div className="absolute right-4 top-4 hidden h-2 w-2 rounded-full bg-[#E1E2E4] lg:block"></div>
          </div>
        </div>

        <div className="absolute left-4 top-4 hidden h-2 w-2 rounded-full bg-white lg:block"></div>
        <div className="absolute bottom-4 left-4 hidden h-2 w-2 rounded-full lg:block lg:bg-white xl:bg-[#E1E2E4]"></div>
        <div className="absolute right-4 top-4 hidden h-2 w-2 rounded-full bg-white lg:block"></div>
        <div className="absolute bottom-4 right-4 hidden h-2 w-2 rounded-full lg:block lg:bg-white xl:bg-[#E1E2E4]"></div>
      </div>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
        isInitialValid={true}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handleSubmit(values);
          resetForm();
        }}
        initialValues={initialValues}
      >
        {({ errors, touched }) => (
          <Form className="relative flex w-full flex-col gap-6 text-darkgray xl:w-1/2 xl:max-w-[50%]">
            <RequestPersonal errors={errors} />
            <RequestProjectInfo errors={errors} />
            <button
              type="submit"
              className={` flex cursor-pointer items-center rounded-full border-2 border-black bg-black px-9 py-5 font-helvetica text-lg text-white
             transition-all duration-500 hover:bg-white hover:text-black`}
            >
              <div className="flex h-[21px] w-full items-center justify-between">
                Request Project
                <IoChevronForwardSharp size={20} />
              </div>
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SendRequest;

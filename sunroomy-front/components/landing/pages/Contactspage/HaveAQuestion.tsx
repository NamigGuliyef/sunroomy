"use client";
import { Form, Formik, FormikFormProps } from "formik";
import { IoChevronForwardSharp } from "react-icons/io5";
import * as Yup from "yup";
import LocationSelector from "../Requestpage/LocationSelector";
import CountrySelect from "../Requestpage/CountrySelector";
import Input from "../Requestpage/Input";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  number: Yup.string().required("Number is required"),
  countryCode: Yup.string(),
  country: Yup.string(),
  state: Yup.string(),
  city: Yup.string(),
  postalCode: Yup.string(),
  message: Yup.string(),
});

const initialValues = {
  name: "",
  email: "",
  number: "",
  countryCode: "",
  country: "",
  state: "",
  city: "",
  message: "",
  postalCode: "",
};
export default function HaveAQuestion() {
  const handleSubmit = (form: FormikFormProps) => {};
  return (
    <Formik
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={false}
      initialValues={initialValues}
    >
      {({ errors, touched }) => (
        <Form className="relative w-full flex text-darkgray flex-col gap-6">
          <h1 className="text-3.2xl font-semibold text-darkgray">
            Personal Info
          </h1>
          <Input
            errors={errors}
            id="name"
            placeholder="Full Name"
            name="name"
            type="text"
            className=""
            htmlFor="name"
          />
          <div className="flex gap-6">
            <CountrySelect errors={errors} onChange={() => {}} />
            <Input
              errors={errors}
              id="number"
              placeholder="Number"
              name="number"
              type="text"
              className="w-9/12"
              htmlFor="number"
            />
          </div>
          <Input
            errors={errors}
            id="email"
            placeholder="Email"
            name="email"
            type="email"
            className=""
            htmlFor="email"
          />
          <LocationSelector errors={errors} />
          <div className="flex flex-col md:flex-row gap-6">
            <Input
              errors={errors}
              id="city"
              placeholder="City"
              name="city"
              type="text"
              className="w-full"
              htmlFor="city"
            />
            <Input
              errors={errors}
              id="postalCode"
              placeholder="Zip Code"
              name="postalCode"
              type="text"
              className="w-full"
              htmlFor="postalCode"
            />
          </div>
          <div className="flex">
            <Input
              errors={errors}
              id="message"
              placeholder="Your Message"
              name="message"
              type="textarea"
              component="textarea"
              className="w-full"
              htmlFor="message"
            />
          </div>
          <div className="flex"></div>
          <button
            type="submit"
            className={` py-5 px-9 bg-black text-white flex items-center border-2 hover:text-black border-black hover:bg-white font-helvetica text-lg
        transition-all duration-500 cursor-pointer rounded-full`}
          >
            <div className="flex items-center h-[21px] justify-between w-full">
              Request Project
              <IoChevronForwardSharp size={20} />
            </div>
          </button>
        </Form>
      )}
    </Formik>
  );
}

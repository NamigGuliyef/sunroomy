"use client";
import React from "react";
import Input from "./Input";
import LocationSelector from "./LocationSelector";
import CountrySelect from "./CountrySelector";
import { FormikErrors } from "formik";
import { MyFormProps } from "./SendRequest";

const RequestPersonal = ({ errors }: { errors: FormikErrors<MyFormProps> }) => {
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
  };
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
  return (
    <>
      <h1 className="text-3.2xl font-semibold text-darkgray">Personal Info</h1>
      <Input
        errors={errors}
        id="first_name"
        placeholder="First Name"
        name="first_name"
        onChange={handleFirstNameChange}
        type="text"
        className=""
        htmlFor="first_name"
      />
      <Input
        errors={errors}
        id="last_name"
        placeholder="Last Name"
        name="last_name"
        onChange={handleLastNameChange}
        type="text"
        className=""
        htmlFor="last_name"
      />
      <div className="flex flex-col md:flex-row gap-5">
        <CountrySelect errors={errors} />
        <Input
          errors={errors}
          id="phone_number"
          onChange={handleNumberChange}
          placeholder="Phone Number"
          name="phone_number"
          type="text"
          className="grow"
          htmlFor="phone_number"
        />
      </div>
      <Input
        errors={errors}
        id="email"
        placeholder="Email"
        name="email"
        type="text"
        className=""
        htmlFor="email"
      />
      <LocationSelector errors={errors} />
      <div className="flex flex-col md:flex-row gap-5">
        <Input
          errors={errors}
          id="city"
          placeholder="City"
          name="city"
          type="text"
          className="w-full md:w-1/2"
          htmlFor="city"
        />
        <Input
          errors={errors}
          id="zipcode"
          placeholder="Zip Code"
          name="zipcode"
          type="text"
          className="w-full md:w-1/2"
          htmlFor="zipcode"
        />
      </div>
    </>
  );
};

export default RequestPersonal;

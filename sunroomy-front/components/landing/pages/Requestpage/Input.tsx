"use client";
import {
  ErrorMessage,
  Field,
  FormikErrors,
  FormikValues,
  useField,
  useFormikContext,
} from "formik";
import React from "react";

function Input({
  id,
  name,
  placeholder,
  className,
  errors,
  component,
  type,
  min,
  maxLength,
  max,
  onChange,
  value,
  htmlFor,
}: {
  id: string;
  name: string;
  placeholder: string;
  className: string;
  component?: string;
  min?: number;
  max?: number;
  maxLength?: number;
  errors: FormikErrors<FormikValues>;
  type: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  htmlFor: string;
}) {
  const hasError = errors[name];
  const { setFieldValue } = useFormikContext();
  return (
    <div className={`relative ${className ? className : "w-full"}`}>
      <Field
        component={component || "input"}
        id={id}
        name={name}
        placeholder={""}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (max) {
            e.target.value = Math.max(0, parseInt(e.target.value))
              .toString()
              .slice(0, max);
            if (e.target.value.length <= 0) {
              e.target.value = String(0);
            }
          }
        }}
        maxLength={maxLength}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setFieldValue(name, e.target.value), onChange && onChange(e);
        }}
        value={value}
        className={`focus:outline-none resize-none file:bg-black file:rounded-2.5xl file:px-4 file:py-2 file:text-white file:font-sf file:border-0 file:p-2 file:text-sm focus-visible:right-0 focus-visible:border-2 peer w-full font-sf outline-none rounded-[8px] ${
          component === "textarea" ? "h-24 md:h-32" : "h-[58px]"
        } px-4 ${type === 'file' ? "py-[10px]" : "pt-6"} border border-[#ABAFB1] ${hasError && "!border-red-500"}`}
        type={type}
      />
      {type !== "file" && (
        <label
          htmlFor={htmlFor}
          className="absolute cursor-text font-sf text-sm peer-placeholder-shown:text-base text-[#5E6366] peer-placeholder-shown:text-[#ABAFB1] top-2 peer-focus:top-2 peer-focus:left-4 transition-all left-4 peer-placeholder-shown:left-4 peer-placeholder-shown:top-4"
        >
          {placeholder}
        </label>
      )}
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
}

export default Input;

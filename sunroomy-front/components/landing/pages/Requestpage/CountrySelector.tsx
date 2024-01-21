/* eslint-disable @next/next/no-img-element */
"use client";
import clsx from "clsx";
import { Country, ICountry } from "country-state-city";
import { ErrorMessage, FormikErrors, useFormikContext } from "formik";
import React, { useMemo, useState } from "react";
import Select from "react-select";
import { MyFormProps } from "./SendRequest";

interface CountrySelectProps {
  value?: string;
  onChange?: (value: string) => void;
  errors: FormikErrors<MyFormProps>;
}

interface SelectOption {
  value: string;
  label: string | React.JSX.Element;
}

const dropdownIndicatorStyles =
  "mr-2 text-gray-500 rounded-md hover:text-black";

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  errors,
}) => {
  const { setFieldValue } = useFormikContext();
  const countries = Country.getAllCountries();

  countries.sort((a: ICountry, b: ICountry) => {
    return a.name.localeCompare(b.name);
  });

  const options = countries.map((country) => ({
    label: (
      <div className="flex items-center gap-2">
        <img
          src={`https://flagcdn.com/h20/${country.isoCode.toLowerCase()}.png`}
          height="24"
          width="35"
          alt="Ukraine"
        />
        {/* <svg className="h-6 w-[35px]">
          <use xlinkHref={`/flags.svg#${country.isoCode.toLowerCase()}`} />
        </svg> */}
        {"+" +
          (country.phonecode.startsWith("+")
            ? country.phonecode.substring(1)
            : country.phonecode)}
      </div>
    ),
    value: country.phonecode,
  }));

  const [selectedCountry, setSelectedCountry] = useState<SelectOption | null>(
    null,
  );

  const styles = useMemo(
    () => ({
      input: (base: any) => ({
        ...base,
        "input:focus": {
          boxShadow: "none",
          outline: "none",
        },
      }),
    }),
    [],
  );

  const classNames = useMemo(
    () => ({
      container: () => "w-full min-w-full",
      input: () => " font-sf !text-[#ABAFB1] py-0.5 focus:outline-none",
      control: () =>
        clsx(
          errors.countryCode && "border !border-red-500",
          "focus:outline-none !rounded-[8px] px-2 font-sf !text-[#ABAFB1] focus:border-none hover:cursor-pointer !shadow-none !border-[#ABAFB1] py-2 h-[58px]",
        ),
      indicatorSeparator: () => "hidden",
      menu: () => "!w-[170px] top-3/4",
      dropdownIndicator: () => dropdownIndicatorStyles,
      singleValue: () => "!text-[#ABAFB1] !font-sf",
      menuList: () => "w-[170px]",
      option: ({
        isFocused,
        isSelected,
      }: {
        isFocused: any;
        isSelected: any;
      }) =>
        clsx(
          isFocused && "!bg-[#abafb28f]",
          isSelected && "!bg-[#ABAFB1]",
          "hover:bg-[#ABAFB1] transition-all !text-[#333] duration-300 hover:cursor-pointer",
        ),
      placeholder: () => "font-sf text-[#ABAFB1] text-base",
    }),
    [errors.countryCode],
  );

  return (
    <div>
      <Select
        placeholder="Country Code"
        options={options}
        id="country-select"
        isSearchable={false}
        defaultValue={selectedCountry}
        onChange={(e) => setFieldValue("countryCode", "+" + e?.value)}
        styles={styles}
        classNames={classNames}
        instanceId="country-select"
      />
      <ErrorMessage
        name={"countryCode"}
        component="div"
        className="text-sm text-red-500"
      />
    </div>
  );
};

export default CountrySelect;

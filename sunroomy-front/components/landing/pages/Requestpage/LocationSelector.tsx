"use client";
import clsx from "clsx";
import { Country, ICountry, IState, State } from "country-state-city";
import { ErrorMessage, FormikErrors, useFormikContext } from "formik";
import { useId, useState } from "react";
import Select, { ActionMeta, SingleValue } from "react-select";
import { MyFormProps } from "./SendRequest";

interface SelectOption {
  value: string;
  label: string;
}

const dropdownIndicatorStyles =
  "mr-2 text-gray-500 rounded-md hover:text-black";

function LocationSelector({ errors }: { errors: FormikErrors<MyFormProps> }) {
  const [selectedCountry, setSelectedCountry] = useState<SelectOption | null>({
    value: "US",
    label: "United States",
  });
  const [selectedState, setSelectedState] = useState<SelectOption | null>({
    value: "CA",
    label: "California",
  });
  const { setFieldValue } = useFormikContext();
  const handleCountryChange = (
    newValue: SingleValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>
  ) => {
    setSelectedCountry(newValue);
    setFieldValue("country", newValue?.label);
  };

  const mapCountryToSelectOption = (country: ICountry): SelectOption => ({
    value: country.isoCode,
    label: country.name,
  });
  const mapStateToSelectOption = (state: IState): SelectOption => ({
    value: state.isoCode,
    label: state.name,
  });
  const countryOptions: SelectOption[] = Country.getAllCountries().map(
    mapCountryToSelectOption
  );
  const stateOptions: SelectOption[] = State.getStatesOfCountry(
    selectedCountry?.value
  ).map(mapStateToSelectOption);

  const handeStateChange = (
    newValue: SingleValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>
  ) => {
    setSelectedState(newValue);
    setFieldValue("state", newValue?.label);
  };
  return (
    <div className="flex flex-col md:flex-row gap-5">
      <div className="w-full md:w-1/2">
        <Select
          name="country"
          id="country"
          options={countryOptions}
          isSearchable={false}
          value={selectedCountry}
          onChange={handleCountryChange}
          placeholder="Country"
          instanceId={useId()}
          styles={{
            input: (base) => ({
              ...base,
              "input:focus": {
                boxShadow: "none",
                outline: "none",
              },
            }),
          }}
          classNames={{
            container: () => "w-full",
            input: () => " font-sf !text-[#ABAFB1] py-0.5 focus:outline-none",
            control: () =>
              clsx(
                errors.country && "!border !border-red-500",
                "focus:outline-none !rounded-[8px] px-2 font-sf !text-[#ABAFB1] focus:border-none hover:cursor-pointer !shadow-none !border-[#ABAFB1] py-2 h-[58px]"
              ),
            indicatorSeparator: () => "hidden",
            dropdownIndicator: () => dropdownIndicatorStyles,
            singleValue: () => "!text-[#ABAFB1] !font-sf",
            option: ({ isFocused, isSelected }) =>
              clsx(
                isFocused && "!bg-[#abafb28f]",
                isSelected && "!bg-[#ABAFB1]",
                "hover:bg-[#ABAFB1] transition-all !text-[#333] duration-300 hover:cursor-pointer"
              ),
            placeholder: () => "font-sf text-[#ABAFB1] text-base",
          }}
        />
        <ErrorMessage
          name={"country"}
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
      <div className="w-full md:w-1/2">
        <Select
          name="State"
          id="State"
          instanceId={useId()}
          isSearchable={false}
          options={stateOptions}
          value={selectedState}
          onChange={handeStateChange}
          placeholder="State"
          isDisabled={selectedCountry?.value ? false : true}
          styles={{
            input: (base) => ({
              ...base,
              "input:focus": {
                boxShadow: "none",
                outline: "none",
              },
            }),
          }}
          classNames={{
            container: () => "w-full",
            input: () => " font-sf !text-[#ABAFB1] py-0.5 focus:outline-none",
            control: () =>
              clsx(
                errors.state && "border !border-red-500",
                "focus:outline-none !rounded-[8px] px-2 font-sf !text-[#ABAFB1] focus:border-none hover:cursor-pointer !shadow-none !border-[#ABAFB1] py-2 h-[58px]"
              ),
            indicatorSeparator: () => "hidden",
            dropdownIndicator: () => dropdownIndicatorStyles,
            singleValue: () => "!text-[#ABAFB1] !font-sf",
            option: ({ isFocused, isSelected }) =>
              clsx(
                isFocused && "!bg-[#abafb28f]",
                isSelected && "!bg-[#ABAFB1]",
                "hover:bg-[#ABAFB1] transition-all !text-[#333] duration-300 hover:cursor-pointer"
              ),
            placeholder: () => "font-sf text-[#ABAFB1] text-base",
          }}
        />
        <ErrorMessage
          name={"state"}
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
    </div>
  );
}
export default LocationSelector;

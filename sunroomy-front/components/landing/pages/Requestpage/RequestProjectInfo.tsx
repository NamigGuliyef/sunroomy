"use client";
import clsx from "clsx";
import { ErrorMessage, FormikErrors, useFormikContext } from "formik";
import { useId, useState } from "react";
import Select, {
  ActionMeta,
  MultiValue,
  Options,
  SingleValue,
} from "react-select";
import Input from "./Input";
import { MyFormProps } from "./SendRequest";
import useRequestProperties from "@/hooks/useRequestProperties";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

const dropdownIndicatorStyles =
  "mr-2 text-gray-500 rounded-md hover:text-black";

const sunroomOptions = [
  { value: "Cubo", label: "Cubo" },
  { value: "Hawaii 80", label: "Hawaii 80" },
  { value: "Prime", label: "Prime" },
  { value: "Pure", label: "Pure" },
];

const louverOptions = [
  { value: "Horizon", label: "Horizon" },
  { value: "Skyline", label: "Skyline" },
];
const pergolasOptions = [
  { value: "Pavilion X", label: "Pavilion X" },
  { value: "Pavilion S", label: "Pavilion S" },
];
const groupedMain = [
  {
    label: "Sunrooms",
    options: sunroomOptions,
  },
  {
    label: "Louvers",
    options: louverOptions,
  },
  {
    label: "Pergolas",
    options: pergolasOptions,
  },
];
const colorOptions = [
  { value: "White / Classic", label: "White / Classic" },
  { value: "White / Creamy", label: "White / Creamy" },
  { value: "White / Snow", label: "White / Snow" },
  { value: "Black / Pure", label: "Black / Pure" },
  { value: "Black / Dusty", label: "Black / Dusty" },
  { value: "Anthracite Grey", label: "Anthracite Grey" },
  { value: "Light Grey", label: "Light Grey" },
  { value: "Dark Brown", label: "Dark Brown" },
  { value: "Light Brown", label: "Light Brown" },
  {
    value: "Special Custom color / +10%",
    label: "Special Custom color / +10%",
  },
];
const windowOptions = [
  { value: "Lift & Slide Door / HD 88", label: "Lift & Slide Door / HD 88" },
  { value: "Folding Door / HD 57", label: "Folding Door / HD 57" },
  {
    value: "Slide & Stack Glass / Pure 17",
    label: "Slide & Stack Glass / Pure 17",
  },
  { value: "Slide Glass / Pure 12", label: "Slide Glass / Pure 12" },
  {
    value: "Skylight Window / Manual / Breezy 45",
    label: "Skylight Window / Manual / Breezy 45",
  },
  {
    value: "Skylight Window / Motorized / Breezy 60",
    label: "Skylight Window / Motorized / Breezy 60",
  },
  { value: "Fix Handrailing", label: "Fix Handrailing" },
  { value: "Fix Window", label: "Fix Window" },
];
const sunscreenOptions = [
  {
    value: "Wall Sunscreen / Proshade V8",
    label: "Wall Sunscreen / Proshade V8",
  },
  {
    value: "Roof Sunscreen / Proshade H1",
    label: "Roof Sunscreen / Proshade H1",
  },
  {
    value: "Sliding Sunscreen / Proshade S7",
    label: "Sliding Sunscreen / Proshade S7",
  },
];
const seoArray = [
  {
    value: "Google Search",
    label: "Google Search",
  },
  {
    value: "Facebook",
    label: "Facebook",
  },
  {
    value: "Instagram",
    label: "Instagram",
  },
  {
    value: "Pinterest",
    label: "Pinterest",
  },
  {
    value: "TikTok",
    label: "TikTok",
  },
  {
    value: "YouTube",
    label: "YouTube",
  },
  {
    value: "Client Referral",
    label: "Client Referral",
  },
  {
    value: "Architect / Designer / Contractor Referral",
    label: "Architect / Designer / Contractor Referral",
  },
  {
    value: "Showroom",
    label: "Showroom",
  },
  {
    value: "Brochure / Catalog",
    label: "Brochure / Catalog",
  },
  {
    value: "Display Ads",
    label: "Display Ads",
  },
  {
    value: "Other",
    label: "Other",
  },
];

const RequestProjectInfo = ({
  errors,
}: {
  errors: FormikErrors<MyFormProps>;
}) => {
  const [mainSystem, setMainSystem] = useState<SelectOption | null>(null);
  const [aboutUs, setAboutUs] = useState<SelectOption | null>(null);
  const [structureSituation, setStructureSituation] =
    useState<SelectOption | null>(null);
  const [structureColor, setStructureColor] = useState<SelectOption | null>(
    null,
  );
  const [windowsAndDoors, setWindowsAndDoors] =
    useState<MultiValue<SelectOption> | null>(null);

  const [sunscreens, setSunscreens] = useState<MultiValue<SelectOption> | null>(
    null,
  );

  const { setFieldValue } = useFormikContext();
  const { setWidth, setHeight, setProjection } = useRequestProperties();

  const handleSelectChange = (
    newValue: SingleValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>,
    setSystem: React.Dispatch<React.SetStateAction<SingleValue<SelectOption>>>,
    setFieldValue: (field: string, value: string | undefined) => void,
    fieldName: string,
  ) => {
    setSystem(newValue);
    setFieldValue(fieldName, newValue?.label);
  };
  const handleMultipleSelectChange = (
    newValue: MultiValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>,
    setSystem: React.Dispatch<
      React.SetStateAction<MultiValue<SelectOption> | null>
    >,
    setFieldValue: (field: string, value: string[] | undefined) => void,
    fieldName: string,
  ) => {
    setSystem(newValue);

    const values = newValue ? newValue.map((option) => option.value) : [];
    setFieldValue(fieldName, values);
  };
  const handleMainChange = (
    newValue: SingleValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>,
  ) => {
    handleSelectChange(
      newValue,
      actionMeta,
      setMainSystem,
      setFieldValue,
      "main_structure_model",
    );
  };
  const handleSituationChange = (
    newValue: SingleValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>,
  ) => {
    handleSelectChange(
      newValue,
      actionMeta,
      setStructureSituation,
      setFieldValue,
      "structure_situation",
    );
  };
  const handleColorChange = (
    newValue: SingleValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>,
  ) => {
    handleSelectChange(
      newValue,
      actionMeta,
      setStructureColor,
      setFieldValue,
      "structure_color",
    );
  };
  const handleWindowsChange = (
    newValue: MultiValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>,
  ) => {
    handleMultipleSelectChange(
      newValue,
      actionMeta,
      setWindowsAndDoors,
      setFieldValue,
      "window_and_doors",
    );
  };
  const handleSunscreenChange = (
    newValue: MultiValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>,
  ) => {
    handleMultipleSelectChange(
      newValue,
      actionMeta,
      setSunscreens,
      setFieldValue,
      "sunscreens",
    );
  };
  const handleSeoChange = (
    newValue: SingleValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>,
  ) => {
    handleSelectChange(
      newValue,
      actionMeta,
      setAboutUs,
      setFieldValue,
      "about_us",
    );
  };
  const isOptionDisabled = (
    option: SelectOption,
    selectValue: Options<SelectOption>,
  ) => {
    return !!(windowsAndDoors && windowsAndDoors.length >= 4);
  };

  const selectClassNames = (error: any) => ({
    container: () => "max-w-full w-full",
    input: () => " font-sf !text-[#ABAFB1] py-0.5 focus:outline-none",
    control: () =>
      clsx(
        error && "border !border-red-500",
        "focus:outline-none !rounded-[8px] px-2 font-sf !text-[#ABAFB1] focus:border-none hover:cursor-pointer !shadow-none !border-[#ABAFB1] py-2 h-[58px]",
      ),
    indicatorSeparator: () => "hidden",
    dropdownIndicator: () => dropdownIndicatorStyles,
    singleValue: () => "!text-[#ABAFB1] !font-sf",
    option: ({
      isFocused,
      isSelected,
    }: {
      isFocused: boolean;
      isSelected: boolean;
    }) =>
      clsx(
        isFocused && "!bg-[#abafb28f]",
        isSelected && "!bg-[#ABAFB1]",
        "hover:bg-[#ABAFB1] transition-all !text-[#333] duration-300 hover:cursor-pointer",
      ),
    placeholder: () => "font-sf text-[#ABAFB1] text-base",
  });
  const mainClassNames = selectClassNames(errors.main_structure_model);
  const structureClassNames = selectClassNames(errors.structure_situation);
  const structureColorClassNames = selectClassNames(errors.structure_color);
  const windowsClassNames = selectClassNames(errors.window_and_doors);
  const sunscreensClassNames = selectClassNames(errors.sunscreens);
  const aboutUsClassNames = selectClassNames(errors.about_us);
  return (
    <>
      <h1 className="mt-6 text-3.2xl font-semibold text-darkgray">
        Project Info
      </h1>
      <div>
        <Select
          instanceId={useId()}
          name="mainSystems"
          id="mainSystems"
          onChange={handleMainChange}
          isSearchable={false}
          placeholder="Main Systems"
          options={groupedMain}
          styles={{
            input: (base) => ({
              ...base,
              "input:focus": {
                boxShadow: "none",
                outline: "none",
              },
            }),
          }}
          classNames={mainClassNames}
        />
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
        <Input
          errors={errors}
          id="width_in_feet"
          placeholder="Width / in Feet"
          name="width_in_feet"
          type="number"
          max={3}
          maxLength={5}
          onChange={(e) => setWidth(e.target.value)}
          className=""
          htmlFor="width_in_feet"
        />
        <Input
          errors={errors}
          id="projection_in_feet"
          placeholder="Projection / in Feet"
          name="projection_in_feet"
          onChange={(e) => setProjection(e.target.value)}
          type="number"
          className=""
          max={3}
          htmlFor="projection_in_feet"
        />
        <Input
          errors={errors}
          id="height_in_feet"
          placeholder="Height / in Feet"
          name="height_in_feet"
          type="number"
          max={3}
          onChange={(e) => setHeight(e.target.value)}
          className=""
          htmlFor="height_in_feet"
        />
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
        <Select
          instanceId={useId()}
          name="structure_situation"
          id="structure_situation"
          onChange={handleSituationChange}
          isSearchable={false}
          placeholder="Structure Situation"
          options={[
            {
              value: "Attached to the Building",
              label: "Attached to the Building",
            },
            {
              value: "Freestanding",
              label: "Freestanding",
            },
          ]}
          styles={{
            input: (base) => ({
              ...base,
              "input:focus": {
                boxShadow: "none",
                outline: "none",
              },
            }),
          }}
          classNames={structureClassNames}
        />
        <Select
          instanceId={useId()}
          name="structure_color"
          id="structure_color"
          onChange={handleColorChange}
          isSearchable={false}
          placeholder="Structure Color"
          options={colorOptions}
          styles={{
            input: (base) => ({
              ...base,
              "input:focus": {
                boxShadow: "none",
                border: "2px",
                outline: "none",
              },
            }),
          }}
          classNames={structureColorClassNames}
        />
      </div>
      <div className="flex flex-col">
        <Select
          instanceId={useId()}
          name="window_and_doors"
          id="window_and_doors"
          onChange={handleWindowsChange}
          isSearchable={false}
          placeholder="Window & Doors"
          options={windowOptions}
          isOptionDisabled={isOptionDisabled}
          isMulti
          styles={{
            valueContainer: (base) => ({
              ...base,
              flexWrap: "nowrap",
            }),
            input: (base) => ({
              ...base,
              "input:focus": {
                boxShadow: "none",
                border: "2px",
                outline: "none",
              },
            }),
          }}
          classNames={windowsClassNames}
        />
        <ErrorMessage
          name="window_and_doors"
          component="div"
          className="text-sm text-red-500"
        />
      </div>
      <Select
        instanceId={useId()}
        name="sunscreens"
        id="sunscreens"
        onChange={handleSunscreenChange}
        isSearchable={false}
        placeholder="Sunscreens"
        options={sunscreenOptions}
        isMulti
        styles={{
          valueContainer: (base) => ({
            ...base,
            flexWrap: "nowrap",
          }),
          input: (base) => ({
            ...base,
            "input:focus": {
              boxShadow: "none",
              border: "2px",
              outline: "none",
            },
          }),
        }}
        classNames={sunscreensClassNames}
      />
      <Input
        errors={errors}
        id="files"
        placeholder="Height / in Feet"
        name="files"
        type="file"
        onChange={(e) => setFieldValue("files", e.target.files)}
        className=""
        htmlFor="files"
      />
      <Input
        errors={errors}
        id="project_details"
        placeholder="Write About Your Project Details"
        name="project_details"
        type="textarea"
        component="textarea"
        className=""
        htmlFor="project_details"
      />
      <Select
        instanceId={useId()}
        name="about_us"
        id="about_us"
        onChange={handleSeoChange}
        isSearchable={false}
        placeholder="How Did You Hear About Us?"
        options={seoArray}
        styles={{
          input: (base) => ({
            ...base,
            "input:focus": {
              boxShadow: "none",
              outline: "none",
            },
          }),
        }}
        classNames={aboutUsClassNames}
      />
    </>
  );
};

export default RequestProjectInfo;

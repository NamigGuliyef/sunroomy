import { IContact } from "@/types/types";

export default function Contact({
  conctactsData,
}: {
  conctactsData: IContact;
}) {
  const { title, location, email, phone, mapLink } = conctactsData;
  return (
    <div className="w-full lg:w-6/12 flex text-darkgray justify-between gap-12 lg:gap-0 flex-col">
      <div className="flex flex-col gap-12">
        <h1 className="text-3.2xl lg:text-[72px] lg:mb-8">Our contacts</h1>
        <p className="w-9/12 lg:w-7/12 text-xl lg:text-base capitalize leading-[145%] font-light">
          {title}
        </p>
      </div>
      <h2 className="text-3.2xl lg:text-5xl xl:text-[56px] leading-[120%] lg:leading-[145%]">
        {location}
      </h2>
      <div className="flex flex-col gap-6 lg:flex-row xl:gap-16 text-2xl lg:text-3xl xl:text-3.2xl">
        <h2>{email}</h2>
        <h2 className="">{phone}</h2>
      </div>
    </div>
  );
}

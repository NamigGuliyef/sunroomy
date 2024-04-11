import ScrollDown from "@/components/landing/Common/ScrollDown";

export function ProductsHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="container grid grid-cols-1 gap-12 px-6 pb-12 pt-8 !text-darkgray md:grid-cols-6 md:gap-0 lg:grid-cols-12 lg:px-0 lg:pb-24 lg:pt-24">
      <div className="flex flex-col justify-between md:col-span-3 lg:col-span-5 xl:col-span-4">
        <h1 className="text-3.2xl font-semibold md:text-6xl lg:mb-24 lg:text-7.2xl lg:font-normal">
          {title}
          {/* <span className="text-base md:text-4xl">series</span> */}
        </h1>
        <ScrollDown />
      </div>
      <div className="flex flex-col md:col-span-3 lg:col-span-7 lg:col-start-6 xl:col-start-6">
        <div
          dangerouslySetInnerHTML={{ __html: description }}
          className="text-xl md:text-justify md:leading-[125%] lg:max-w-[852px] lg:text-2xl"
        ></div>
      </div>
    </div>
  );
}

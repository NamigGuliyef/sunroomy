/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import { cn } from "@/lib/utils";
import { IProductApplication } from "@/types/types";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
const ProductApplications = ({
  applications,
}: {
  applications: IProductApplication[];
}) => {
  const [activeApp, setActiveApp] = useState<IProductApplication | null>(
    applications[0] || null,
  );
  const handleSelectApplication = (selectedApp: IProductApplication) => {
    if (selectedApp !== activeApp) {
      setActiveApp(selectedApp);
    }
  };

  return (
    <div className="container mt-24 px-6 lg:px-0">
      <div className="mb-12 md:mb-14 flex flex-col lg:gap-6 md:text-center">
        <h1 className="text-3.2xl md:text-5xl font-semibold text-darkgray">
          Product Application
        </h1>
        <p className="text-2xl text-darkgray">Vel viverra in mi quis. Egestas neque</p>
      </div>

      <div className="lg:min-h-[750px] grid-cols-12 gap-6 lg:grid">
        <div className="grid grid-cols-2 grid-rows-2 gap-3 lg:col-span-6 lg:grid-cols-1 lg:grid-rows-4 lg:gap-6 xl:col-span-4 xl:grid-cols-1 xl:grid-rows-4">
          {applications?.map((application) => (
            <div
              key={application._id}
              onClick={() => {
                handleSelectApplication(application);
              }}
              className={cn(
                "flex cursor-pointer flex-col gap-6 rounded-2xl border border-[#BABABA] bg-white p-6 text-center text-secondaryblack transition-all duration-500 ease-in hover:border-transparent hover:bg-secondarygray lg:rounded-[30px] lg:p-8 lg:text-start",
                activeApp?._id === application._id &&
                  "border-transparent bg-secondarygray",
              )}
              id="applicationCard"
            >
              <h2 className="text-base font-semibold lg:text-2xl">
                {application.title}
              </h2>
              <p className="hidden leading-[150%] lg:block">
                {application.description}
              </p>
            </div>
          ))}
        </div>
        <div className="lg:hidden">
          <p className="mb-6 mt-4 text-base leading-[150%] md:text-xl">
            {activeApp?.description}
          </p>
          <Swiper
            spaceBetween={24}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
            }}
            className="max-h-[520px] w-full lg:!hidden "
          >
            {activeApp?.photos?.map((item: any, idx: number) => (
              <SwiperSlide className="" key={idx}>
                <div className="rounded-2xl overflow-hidden h-[327px] min-[450px]:h-[450px] min-[450px]:min-h-[450px] min-h-[327px] w-full">
                  <Image
                    src={item}
                    width={327}
                    height={327}
                    className=" flex h-full w-full object-cover"
                    alt="Image"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="hidden max-h-[750px] lg:col-span-6 lg:flex xl:col-span-4">
          <div className="flex h-full overflow-hidden rounded-[25px]">
            <Image
              className="flex h-full min-h-[712px] object-cover lg:w-full xl:w-auto"
              src={activeApp?.photos[0]!}
              alt=""
              width={450}
              height={712}
            />
          </div>
        </div>
        <div className="hidden max-h-[750px] gap-9 lg:col-span-12 lg:flex xl:col-span-4 xl:flex-col">
          <div className="overflow-hidden rounded-[15px] lg:h-[50%] lg:min-h-[470px] lg:w-full xl:h-[60%] xl:min-h-fit">
            <Image
              alt="Image"
              src={activeApp?.photos[1]!}
              className="h-full w-full object-cover"
              width={424}
              height={587}
            />
          </div>
          <div className="overflow-hidden rounded-[25px] lg:h-[50%] lg:min-h-[470px] lg:w-full xl:h-[40%] xl:min-h-fit">
            <Image
              alt="Image"
              src={activeApp?.photos[2]!}
              className="h-full w-full object-cover"
              width={424}
              height={587}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductApplications;
{
  /* <div className="hidden gap-6 grid-cols-12 max-h-[755px]">
        <div className="flex flex-col h-full col-span-4 gap-6">
          <div
            className="bg-secondarygray flex flex-col gap-6 p-8 rounded-[30px] text-secondaryblack"
            id="applicationCard"
          >
            <h2 className="font-semibold text-2xl">Application 1</h2>
            <p className="leading-[150%]">
              Venenatis neque odio tempor proin ultrices arcu turpis amet
              iaculis. Cursus maecenas tristique eget.
            </p>
          </div>
          <div
            className="bg-secondarygray flex flex-col gap-6 p-8 rounded-[30px] text-secondaryblack"
            id="applicationCard"
          >
            <h2 className="font-semibold text-2xl">Application 1</h2>
            <p className="leading-[150%]">
              Venenatis neque odio tempor proin ultrices arcu turpis amet
              iaculis. Cursus maecenas tristique eget.
            </p>
          </div>
          <div
            className="bg-secondarygray flex flex-col gap-6 p-8 rounded-[30px] text-secondaryblack"
            id="applicationCard"
          >
            <h2 className="font-semibold text-2xl">Application 1</h2>
            <p className="leading-[150%]">
              Venenatis neque odio tempor proin ultrices arcu turpis amet
              iaculis. Cursus maecenas tristique eget.
            </p>
          </div>
          <div
            className="bg-secondarygray flex flex-col gap-6 p-8 rounded-[30px] text-secondaryblack"
            id="applicationCard"
          >
            <h2 className="font-semibold text-2xl">Application 1</h2>
            <p className="leading-[150%]">
              Venenatis neque odio tempor proin ultrices arcu turpis amet
              iaculis. Cursus maecenas tristique eget.
            </p>
          </div>
        </div>
        <div className="col-span-4 h-full flex">
          <div className="rounded-[25px] flex overflow-hidden">
            <Image
              className="flex "
              src={"/images/products-page/Image.png"}
              alt=""
              width={450}
              height={712}
            />
          </div>
        </div>
        <div className="col-span-4 grid grid-rows-[3fr,1fr] gap-9 ">
          <div className="bg-blue-400 rounded-[15px] h-fit overflow-hidden">
            <img
              src="/images/products-page/inspire-3.png"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="bg-red-400 rounded-[25px] overflow-hidden">
            <img src="/images/products-page/inspire-2.png" className="h-fit " />
          </div>
        </div>
      </div> */
}

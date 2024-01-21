import React from "react";
import LinkArrow from "@/components/landing/Common/LinkArrow";
import Image from "next/image";

const TailoredDesign = () => {
  return (
    <div className="container mb-16 flex flex-col gap-6 px-6 md:flex-row lg:px-0">
      <div className="overflow-hidden rounded-2.5xl md:w-1/2 lg:w-7/12">
        <Image
          src={"/images/main-page/support.png"}
          width={760}
          height={550}
          className="hidden h-full w-full rounded-2.5xl object-cover lg:block"
          alt="Image"
        />
        <Image
          src={"/images/main-page/supportMobile.png"}
          width={327}
          height={327}
          className="block h-[327px] min-h-[327px] w-full rounded-2.5xl object-cover md:h-auto lg:hidden"
          alt="Image"
        />
      </div>
      <div className="flex h-[327px] min-h-[327px] flex-col overflow-hidden rounded-2.5xl bg-mainblack p-5 pr-20 md:h-auto md:w-1/2 lg:w-5/12 lg:py-12 lg:pl-8 lg:pr-16 xl:py-14 xl:pl-10 xl:pr-20">
        <h1 className="text-3.2xl font-semibold leading-[115%] text-white lg:text-5xl">
          <span className="text-lightblue">Tailored</span>
          <br />
          Project Design
        </h1>
        <p className="mb-auto mt-4 font-light leading-[125%] text-white opacity-80 lg:mb-0 lg:mt-8 lg:text-2xl xl:mt-12">
          We design your outdoor and backyard space to maximize the usage,
          ultimately all year around. Let’s make your dreams come true now.
        </p>
        <LinkArrow className="mt-auto text-lg" to="/design" before={false}>
          Explore
        </LinkArrow>
      </div>
    </div>
  );
};

export default TailoredDesign;

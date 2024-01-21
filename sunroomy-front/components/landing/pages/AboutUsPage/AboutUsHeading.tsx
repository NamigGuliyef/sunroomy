"use client";
import ScrollDown from "@/components/landing/Common/ScrollDown";
import Image from "next/image";

export default function AboutUsHeading({
  description,
}: {
  description: string;
}) {
  return (
    <div className="container grid grid-cols-1 gap-12 px-6 pb-8 pt-8 text-darkgray md:grid-cols-2 md:gap-6 lg:grid-cols-12 lg:gap-0 lg:px-0 lg:pb-24 lg:pt-24">
      <div className="flex flex-col justify-between lg:col-span-5 xl:col-span-6">
        <div className="flex flex-col gap-48">
          <h1 className="mb-8 text-3.2xl font-bold md:mb-0 md:text-6xl md:font-normal lg:text-7.2xl">
            About Us
          </h1>
          <ScrollDown />
        </div>
        <div className="relative h-[327px] w-full md:h-[500px]">
          <Image
            src="/images/about-us/business.jpg"
            className="h-auto w-full rounded-2.5xl object-cover"
            fill
            quality={75}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw"
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-col md:ml-12 lg:col-span-6 lg:col-start-7 xl:col-start-auto">
        <p className="max-w-[532px] text-xl leading-[125%] lg:text-2xl">
          {description}
        </p>
      </div>
    </div>
  );
}

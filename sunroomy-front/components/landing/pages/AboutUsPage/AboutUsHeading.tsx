"use client";
import ScrollDown from "@/components/landing/Common/ScrollDown";
import Image from "next/image";

export default function AboutUsHeading({
  description,
}: {
  description: string;
}) {
  return (
    <div className="container flex flex-col gap-12 px-6 pb-8 pt-8 text-darkgray lg:px-0 lg:pb-24 lg:pt-24">
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-48">
          <h1 className="mb-8 text-3.2xl font-bold md:mb-0 md:text-6xl md:font-normal lg:text-7.2xl">
            About Us
          </h1>
          {/* <ScrollDown /> */}
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <div
          className="text-xl leading-[125%] lg:text-2xl"
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>
        <div className="relative h-[327px] md:h-[500px]">
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
    </div>
  );
}

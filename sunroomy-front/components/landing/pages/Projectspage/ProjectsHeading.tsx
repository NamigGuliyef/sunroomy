"use client";
import ScrollDown from "@/components/landing/Common/ScrollDown";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function ProjectsHeading() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const active = searchParams.get("type");
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);

      if (params.has(name)) {
        params.delete(name);
      }

      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="container px-6 lg:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-6 lg:gap-0 pt-8 lg:pt-24 pb-8 lg:pb-24 text-darkgray">
      <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-between">
        <h1 className="text-3.2xl font-bold md:font-normal md:text-6xl lg:text-7.2xl">
          Our Projects
        </h1>
        <ScrollDown />
      </div>
      <div className="lg:col-span-6 lg:col-start-7 xl:col-start-8 flex flex-col">
        <p className="text-xl lg:text-2xl max-w-[532px] leading-[125%]">
          Ante quis sed nibh cras. Ornare ullamcorper libero at elementum enim
          morbi pulvinar. Ac hendrerit nisl rhoncus nisl tempus. Ante quis sed
          nibh cras. Ornare ullamcorper libero at elementum enim morbi pulvinar.
          Ac hendrerit nisl.
        </p>
        <div className="p-1 md:p-2.5 mt-8 lg:mt-14 border font-helvetica flex gap-2.5 border-black rounded-full w-full sm:w-1/2 lg:w-fit">
          <button
            onClick={() => {
              router.push(pathname + "?" + createQueryString("type", "home"), {
                scroll: false,
              });
            }}
            className={`py-[9px] w-1/2 lg:px-4 transition-all rounded-full duration-500 ${
              !active || active === "home" ? "bg-black text-white" : ""
            }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              router.push(
                pathname + "?" + createQueryString("type", "business"),
                {
                  scroll: false,
                }
              );
            }}
            className={`py-[9px] w-1/2 lg:px-4 transition-all rounded-full duration-500 ${
              active === "business" ? "bg-black text-white" : ""
            }`}
          >
            Business
          </button>
        </div>
      </div>
    </div>
  );
}

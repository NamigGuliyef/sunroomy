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
    [searchParams],
  );

  return (
    <div className="container grid grid-cols-1 gap-12 px-6 pb-8 pt-8 text-darkgray md:grid-cols-2 md:gap-6 lg:grid-cols-12 lg:gap-0 lg:px-0 lg:pb-24 lg:pt-24">
      <div className="flex flex-col justify-between lg:col-span-5 xl:col-span-4">
        <h1 className="text-3.2xl font-bold md:text-6xl md:font-normal lg:text-7.2xl">
          Our Projects
        </h1>
        <ScrollDown />
      </div>
      <div className="flex flex-col lg:col-span-6 lg:col-start-7 xl:col-start-8">
        <p className="max-w-[532px] text-xl leading-[125%] lg:text-2xl">
          Ante quis sed nibh cras. Ornare ullamcorper libero at elementum enim
          morbi pulvinar. Ac hendrerit nisl rhoncus nisl tempus. Ante quis sed
          nibh cras. Ornare ullamcorper libero at elementum enim morbi pulvinar.
          Ac hendrerit nisl.
        </p>
        <div className="mt-8 flex w-full gap-2.5 rounded-full border border-black p-1 font-helvetica sm:w-1/2 md:p-2.5 lg:mt-14 lg:w-fit">
          <button
            onClick={() => {
              router.push(pathname + "?" + createQueryString("type", "all"), {
                scroll: false,
              });
            }}
            className={`w-1/2 rounded-full py-[9px] transition-all duration-500 lg:px-4 ${
              !active || active === "all" ? "bg-black text-white" : ""
            }`}
          >
            All
          </button>
          <button
            onClick={() => {
              router.push(pathname + "?" + createQueryString("type", "home"), {
                scroll: false,
              });
            }}
            className={`w-1/2 rounded-full py-[9px] transition-all duration-500 lg:px-4 ${
              active === "home" ? "bg-black text-white" : ""
            }`}
          >
            Home
          </button>
          <button
            onClick={() => {
              router.push(
                pathname + "?" + createQueryString("type", "commercial"),
                {
                  scroll: false,
                },
              );
            }}
            className={`w-1/2 rounded-full py-[9px] transition-all duration-500 lg:px-4 ${
              active === "commercial" ? "bg-black text-white" : ""
            }`}
          >
            Commercial
          </button>
        </div>
      </div>
    </div>
  );
}

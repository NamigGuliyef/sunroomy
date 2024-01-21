import Request from "@/components/landing/Common/Request";
import Image from "next/image";
import TailoredDesign from "../Tailored";

export default function Support() {
  return (
    <div className="relative rounded-b-2xl bg-secondarygray pb-12 pt-12 font-sf md:pb-20 md:pt-16 lg:rounded-b-section">
      <TailoredDesign />
      <div className="relative flex overflow-x-hidden">
        <Image
          src={"/images/main-page/leaf.png"}
          className="absolute -right-[48%] top-[5%] min-[460px]:-right-[30%] min-[610px]:-right-[0%] md:right-0 md:top-0"
          alt="leaf"
          width={339}
          height={517}
        />
        <div className="container px-6 lg:px-0">
          <h1 className="text-3.2xl font-semibold leading-[115%] text-darkgray md:text-5xl">
            We Support
            <br />
            <span className="text-[#3A9E0B]">The Sustainability</span>
            <div className="mb-12 mt-12 flex flex-col gap-8 border-b border-black pb-20 md:mb-20 md:mt-24 md:flex-row md:gap-6">
              <div className="flex flex-col gap-6 md:w-1/4">
                <Image
                  src={"/images/main-page/icon-1.png"}
                  width={43}
                  height={43}
                  style={{
                    width: "43px",
                    height: "43px",
                  }}
                  alt="icon"
                />
                <p className="text-base font-light leading-[150%] text-black opacity-60">
                  Lightweight, but sturdy and durable. Small foot-printed
                  structures.
                </p>
              </div>
              <div className="flex flex-col gap-6 md:w-1/4">
                <Image
                  src={"/images/main-page/icon-2.png"}
                  width={43}
                  height={43}
                  style={{
                    width: "43px",
                    height: "43px",
                  }}
                  alt="icon"
                />
                <p className="text-base font-light leading-[150%] text-black opacity-60">
                  More than 75% of the aluminium that has ever been extracted is
                  still in use today.
                </p>
              </div>
              <div className="flex flex-col gap-6 md:w-1/4">
                <Image
                  src={"/images/main-page/icon-3.png"}
                  width={43}
                  height={43}
                  style={{
                    width: "43px",
                    height: "43px",
                  }}
                  alt="icon"
                />
                <p className="text-base font-light leading-[150%] text-black opacity-60">
                  Long life and complete recyclability without reduction in
                  quality.
                </p>
              </div>
              <div className="flex flex-col gap-6 md:w-1/4">
                <Image
                  src={"/images/main-page/icon-4.png"}
                  width={43}
                  height={43}
                  style={{
                    width: "43px",
                    height: "43px",
                  }}
                  alt="icon"
                />
                <p className="text-base font-light leading-[150%] text-black opacity-60">
                  Excellent thermal insulation thanks to thermal separation and
                  airtightness.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Request size={"sm"} />
            </div>
          </h1>
        </div>
      </div>
    </div>
  );
}

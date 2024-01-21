import Request from "@/components/landing/Common/Request";
import Section from "@/components/landing/UI/Section";
import AboutUsHeading from "@/components/landing/pages/AboutUsPage/AboutUsHeading";
import Hero from "@/components/landing/pages/AboutUsPage/Hero";
import SunroomyStats from "@/components/landing/pages/AboutUsPage/SunroomyStats";
import Collection from "@/components/landing/pages/Homepage/About/Collection";
import WhyUs from "@/components/landing/pages/Homepage/WhyUs";
import { IAboutUs, WhyData } from "@/types/types";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description: "The Next Generation of Design and Craft",
};

const DATA = [
  {
    id: 1,
    image: "pergola.png",
    text: "pergola",
  },
  {
    id: 2,
    image: "sunroom.png",
    text: "sunroom",
  },
  {
    id: 3,
    image: "louver.png",
    text: "louver",
  },
  {
    id: 4,
    image: "pergola.png",
    text: "pergola",
  },
  {
    id: 5,
    image: "sunroom.png",
    text: "sunroom",
  },
  {
    id: 6,
    image: "louver.png",
    text: "louver",
  },
  {
    id: 7,
    image: "pergola.png",
    text: "pergola",
  },
  {
    id: 8,
    image: "sunroom.png",
    text: "sunroom",
  },
  {
    id: 9,
    image: "louver.png",
    text: "louver",
  },
  {
    id: 10,
    image: "pergola.png",
    text: "pergola",
  },
  {
    id: 11,
    image: "sunroom.png",
    text: "sunroom",
  },
  {
    id: 12,
    image: "louver.png",
    text: "louver",
  },
];
async function getData(): Promise<IAboutUs[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/about-us`, {
    next: { revalidate: 60 },
  });
  return res.json();
}

async function getWhyUs(): Promise<WhyData[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/why-outdorr`,
    {
      next: { revalidate: 60 },
    },
  );
  return res.json();
}
export default async function Page() {
  try {
    const [data, whyusData] = await Promise.all([getData(), getWhyUs()]);
    const whyUs = whyusData[0];
    const { description } = data[0];
    const stats = data[0];
    console.log(stats);
    return (
      <Section className="mt-24 lg:mt-[88px]">
        <Hero />
        <Section className="relative z-10 -mt-8 rounded-t-2xl bg-white font-sf md:-mt-16 lg:rounded-t-section">
          <AboutUsHeading description={description} />
        </Section>
        <Section className="w-full">
          <WhyUs variant="about" data={whyUs} />
        </Section>
        <Section className="rounded-b-2xl bg-secondarygray pb-12 pt-12 font-sf md:pb-20 md:pt-16 lg:rounded-b-section">
          <SunroomyStats data={stats} />

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
                <div className="mt-12 flex flex-col gap-8 border-b border-black pb-20 md:mb-20 md:mt-24 md:flex-row md:gap-6">
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
                      More than 75% of the aluminium that has ever been
                      extracted is still in use today.
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
                      Excellent thermal insulation thanks to thermal separation
                      and airtightness.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <Collection data={DATA} />
                  <div className="flex justify-center">
                    <Request size={"sm"} />
                  </div>
                </div>
              </h1>
            </div>
          </div>
        </Section>
      </Section>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data</div>;
  }
}

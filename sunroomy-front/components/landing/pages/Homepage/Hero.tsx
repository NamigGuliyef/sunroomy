"use client";
import Image from "next/image";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import { cn } from "@/lib/utils";
import { IHomePageHero } from "@/types/types";
import Link from "next/link";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";

const SLIDER_DATA = [
  {
    id: 1,
    img: "/images/main-page/herobg.webp",
    link: "/products/sunroom",
    name: "Sunroom",
    modelName: "GALAX",
  },
  {
    id: 2,
    img: "/images/main-page/herobg2.webp",
    link: "/products/pergola",
    name: "Pergola",
    modelName: "Stellantis",
  },
];

export default function Hero({ heros }: { heros?: IHomePageHero[] }) {
  const [_, setInit] = useState<boolean>();
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const swiper = useSwiper();
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const [selectedSlide, setSelectedSlide] = useState(0);
  return (
    <div className="relative h-[720px] lg:h-screen">
      <Swiper
        effect="fade"
        speed={700}
        fadeEffect={{
          crossFade: true,
        }}
        autoplay={{
          delay: 5000,
        }}
        onInit={() => setInit(true)}
        onSlideChange={({ isBeginning, isEnd, activeIndex }) => {
          setIsFirstSlide(isBeginning);
          setIsLastSlide(isEnd);
          setSelectedSlide(activeIndex);
        }}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="relative z-10 h-full pt-24"
        navigation={{
          prevEl: prevButtonRef.current,
          nextEl: nextButtonRef.current,
        }}
      >
        {SLIDER_DATA.map((item) => (
          <SwiperSlide key={item.id} className="relative">
            <div className="absolute z-20 h-full w-full bg-black opacity-20"></div>
            <Image
              src={item.img}
              className="absolute inset-0 h-full w-full object-cover"
              fill
              priority
              quality={100}
              alt="Slide N"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="container absolute inset-x-0 bottom-6 top-0 flex flex-col justify-between px-6 pt-24 font-sf lg:bottom-20 lg:px-0">
        <div className="mr-auto">
          <div className="relative z-30 mt-6 flex gap-5 text-[40px] capitalize lg:mt-32 lg:text-7xl">
            <div className=" xs:max-w-sm max-w-[327px] leading-[115%] text-white lg:max-w-[675px]">
              <span className="font-bold">live sustainable</span> feel the
              nature with
              <Image
                src="/images/logom1.svg"
                className="mb-2 ml-2 inline-block lg:hidden"
                width={56}
                height={56}
                alt="image"
              />
            </div>
            <Image
              src="/images/logom1.svg"
              priority={true}
              className="mt-[70px] hidden lg:block"
              width={100}
              height={100}
              style={{
                width: 100,
                height: 100,
              }}
              alt="image"
            />
          </div>
        </div>
        <div className="relative z-10 mb-16 flex flex-row justify-between ">
          <div className="flex items-center gap-5">
            <Link
              href={SLIDER_DATA[selectedSlide].link}
              className="group cursor-pointer transition-all hover:invert"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="76"
                height="76"
                viewBox="0 0 76 76"
                className="h-[56px] w-[56px] fill-transparent md:h-[76px] md:w-[76px]"
              >
                <circle
                  cx="38"
                  cy="38"
                  r="37.25"
                  stroke="#DEDEDE"
                  strokeWidth="1.5"
                />
                <path
                  d="M33.1138 21L49.5 38.5M33 55L49.5 37.5"
                  stroke="#DEDEDE"
                  strokeWidth="1.5"
                />
              </svg>
            </Link>
            <div className="text-md flex flex-col font-sf text-white md:text-xl">
              <p className="font-light">{SLIDER_DATA[selectedSlide].name}</p>
              <p className="font-bold uppercase">
                {SLIDER_DATA[selectedSlide].modelName}
              </p>
            </div>
          </div>
          <div className="flex w-[28%] items-center md:w-auto">
            <div className="h-auto lg:w-full" ref={prevButtonRef}>
              <svg
                width="66"
                height="20"
                viewBox="0 0 66 20"
                fill="none"
                className={cn(
                  "h-auto w-full rotate-180 cursor-pointer transition-opacity",
                  isFirstSlide && "opacity-50",
                )}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.93936e-07 10.6594L63.6388 10.6594L55.552 18.6834L56.4275 19.5469L66 10.047L56.4275 0.546875L55.5582 1.41039L63.6388 9.43455L4.86857e-07 9.43452L5.93936e-07 10.6594Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="h-auto lg:w-full" ref={nextButtonRef}>
              <svg
                width="66"
                height="20"
                viewBox="0 0 66 20"
                fill="none"
                className={cn(
                  "h-auto w-full cursor-pointer transition-opacity",
                  isLastSlide && "opacity-50",
                )}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.93936e-07 10.6594L63.6388 10.6594L55.552 18.6834L56.4275 19.5469L66 10.047L56.4275 0.546875L55.5582 1.41039L63.6388 9.43455L4.86857e-07 9.43452L5.93936e-07 10.6594Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

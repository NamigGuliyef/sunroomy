"use client";
import Section from "@/components/landing/UI/Section";
import { IExtendedProject, IProject } from "@/types/types";
import Image from "next/image";
import { useRef, useState } from "react";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function ProjectsDetailSlider({
  data,
}: {
  data: IExtendedProject;
}) {
  const { photos } = data;
  const [_, setInit] = useState<boolean>();
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  return (
    <Section className="container mt-12 px-6 lg:mt-24 lg:px-0">
      <Swiper
        spaceBetween={24}
        speed={700}
        slidesPerView={1}
        effect="fade"
        onInit={() => setInit(true)}
        onSlideChange={({ isBeginning, isEnd }) => {
          setIsFirstSlide(isBeginning);
          setIsLastSlide(isEnd);
        }}
        className="relative h-[327px] !select-none md:h-[600px]"
        modules={[EffectFade, Navigation, Pagination]}
        navigation={{
          prevEl: prevButtonRef.current,
          nextEl: nextButtonRef.current,
        }}
      >
        {photos.map((item: any, idx: number) => (
          <SwiperSlide
            className="h-[327px] !select-none md:h-[600px]"
            key={idx}
          >
            <Image
              src={item}
              className="block aspect-auto h-full max-h-full w-full rounded-2.5xl object-cover brightness-75 md:object-cover"
              width={1320}
              height={600}
              alt="image"
            />
          </SwiperSlide>
        ))}
        <div className="absolute top-1/2 z-50 hidden w-full -translate-y-1/2 !select-none justify-between px-14 lg:flex">
          <div
            className={`group z-50 rotate-180 transition-all ${
              isFirstSlide ? "cursor-default opacity-0" : "cursor-pointer"
            }`}
            ref={prevButtonRef}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="76"
              height="76"
              viewBox="0 0 76 76"
              className="fill-transparent"
            >
              <circle
                cx="38"
                cy="38"
                r="37.25"
                className="transition-all duration-500 "
                stroke={`${isFirstSlide ? "#000" : "#fff"}`}
                strokeWidth="1.5"
              />
              <path
                className="transition-all duration-500 "
                d="M33.1138 21L49.5 38.5M33 55L49.5 37.5"
                stroke={`${isFirstSlide ? "#000" : "#fff"}`}
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <div
            className={`group z-50 cursor-pointer ${
              isLastSlide && "!cursor-default opacity-0"
            }  transition-all`}
            ref={nextButtonRef}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="76"
              height="76"
              viewBox="0 0 76 76"
              className="fill-transparent"
            >
              <circle
                cx="38"
                cy="38"
                r="37.25"
                className="transition-all duration-500 "
                stroke={`${isLastSlide ? "#000" : "#fff"}`}
                strokeWidth="1.5"
              />
              <path
                d="M33.1138 21L49.5 38.5M33 55L49.5 37.5"
                className="transition-all duration-500 "
                stroke={`${isLastSlide ? "#000" : "#fff"}`}
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      </Swiper>
    </Section>
  );
}

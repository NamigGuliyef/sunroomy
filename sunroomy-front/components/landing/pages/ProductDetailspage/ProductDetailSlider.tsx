"use client";
import Section from "@/components/landing/UI/Section";
import { cn } from "@/lib/utils";
import { ISubProduct } from "@/types/types";
import Image from "next/image";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function ProductDetailSlider({ product }: { product: ISubProduct }) {
  const { photos } = product;
  const [init, setInit] = useState<boolean>(false);
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  return (
    <>
      <Section className="mt-12 lg:mt-24">
        <Swiper
          spaceBetween={24}
          speed={700}
          initialSlide={1}
          breakpoints={{
            320: {
              slidesPerView: 1.1,
              spaceBetween: 12,
              centeredSlides: true,
            },
            768: {
              slidesPerView: 1.89,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: "auto",
            },
          }}
          onInit={() => setInit(true)}
          onSlideChange={({ isBeginning, isEnd, activeIndex }) => {
            setIsFirstSlide(isBeginning);
            setIsLastSlide(isEnd);
          }}
          className="relative h-[327px] !select-none md:h-[500px]"
          modules={[EffectFade, Navigation, Pagination]}
          navigation={{
            prevEl: prevButtonRef.current,
            nextEl: nextButtonRef.current,
          }}
        >
          {photos.map((item: any, idx: number) => (
            <SwiperSlide
              // className="h-[327px] !select-none md:h-[500px]"
              className={cn(
                "h-[327px] !select-none md:h-[500px]",
                idx === 0 ? "lg:!w-1/2" : idx === 2 ? "lg:!w-2/5" : "lg:!w-2/6",
              )}
              key={idx}
            >
              <Image
                src={item}
                className="block aspect-auto h-full max-h-full w-full rounded-2xl object-cover brightness-75 md:rounded-2.5xl md:object-cover"
                width={1320}
                height={500}
                loading="lazy"
                alt="image"
              />
            </SwiperSlide>
          ))}
          <div className="absolute top-1/2 z-50 hidden w-full -translate-y-1/2 !select-none justify-between px-14 lg:flex">
            <div
              className={`group z-50 ${
                !isFirstSlide && "hover:invert"
              }  rotate-180 transition-all ${
                isFirstSlide ? "cursor-default opacity-0" : "cursor-pointer"
              }`}
              ref={prevButtonRef}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="76"
                height="76"
                viewBox="0 0 76 76"
                fill="none"
              >
                <circle
                  cx="38"
                  cy="38"
                  r="37.25"
                  fill="black"
                  fillOpacity="0.2"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <path
                  d="M33.1138 21L49.5 38.5M33 55L49.5 37.5"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <div
              className={`group z-50 ${
                !isLastSlide && "hover:invert"
              } transition-all ${
                isLastSlide ? "cursor-default opacity-0" : "cursor-pointer"
              }`}
              ref={nextButtonRef}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="76"
                height="76"
                viewBox="0 0 76 76"
                fill="none"
              >
                <circle
                  cx="38"
                  cy="38"
                  r="37.25"
                  fill="black"
                  fillOpacity="0.2"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <path
                  d="M33.1138 21L49.5 38.5M33 55L49.5 37.5"
                  stroke="white"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </Swiper>
      </Section>
    </>
  );
}

export default ProductDetailSlider;

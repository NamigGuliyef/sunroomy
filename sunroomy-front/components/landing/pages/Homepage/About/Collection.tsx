"use client";
import { IProduct } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { CollectionNav } from "./CollectionNav";

export interface CollectionProps {
  data: IProduct[];
  containerClass?: string;
}

const Collection: React.FC<CollectionProps> = ({ data, containerClass }) => {
  const [_, setInit] = useState<boolean>();
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const swiper = useSwiper();
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  return (
    <div className={` ${containerClass} font-sf font-semibold`}>
      <div className="mt-12 flex flex-col gap-10 lg:mt-20">
        <div className="flex items-center justify-between text-darkgray">
          <h1 className="text-3.2xl md:text-5xl">Meet our collection</h1>
          <div className="hidden gap-1 text-5xl md:flex">
            <div
              className={isFirstSlide ? "cursor-default" : "cursor-pointer"}
              ref={prevButtonRef}
            >
              <CollectionNav rotate={true} isFirst={isFirstSlide} />
            </div>
            <div
              className={isLastSlide ? "cursor-default" : "cursor-pointer"}
              ref={nextButtonRef}
            >
              <CollectionNav isLast={isLastSlide} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 pb-8 md:pb-16">
        <Swiper
          spaceBetween={24}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 24,
            },
            576: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1320: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          speed={700}
          onInit={() => setInit(true)}
          onSlideChange={({ isBeginning, isEnd }) => {
            setIsFirstSlide(isBeginning);
            setIsLastSlide(isEnd);
          }}
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: prevButtonRef.current,
            nextEl: nextButtonRef.current,
          }}
        >
          {data.map((item) => (
            <SwiperSlide key={item._id}>
              <Link href={"/products/" + item.slug}>
                <div className="flex flex-col gap-8">
                  <div className="min-h-[250px] w-full">
                    <Image
                      src={item.cover_photo}
                      className="h-[250px] w-full select-none rounded-2.5xl object-cover transition-all duration-200 ease-in hover:scale-95 sm:h-[280px] md:h-[327px]"
                      width={500}
                      height={400}
                      alt="image"
                    />
                  </div>
                  <h1 className="text-2xl uppercase text-darkgray">
                    {item.title}
                  </h1>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Collection;

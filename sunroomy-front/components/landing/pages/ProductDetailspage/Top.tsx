"use client"
import { IProduct } from "@/types/types";
import Image from "next/image";
import { useRef, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

interface TopProps {
  products: IProduct;
}
const Collection: React.FC<TopProps> = ({ products }) => {
  const [_, setInit] = useState<boolean>();
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const swiper = useSwiper();
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  return (
    <div className="container px-6 lg:px-0 font-sf font-semibold">
      <div className="flex flex-col gap-10 mt-20">
        <div className="flex text-darkgray justify-between items-center">
          <h1 className="text-3.2xl md:text-5xl">Meet our collection</h1>
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
            530: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          speed={700}
          onInit={() => setInit(true)}
          onSlideChange={({ isBeginning, isEnd }) => {
            setIsFirstSlide(isBeginning);
            setIsLastSlide(isEnd);
          }}></Swiper>
      </div>
    </div>
  );
};

export default Collection;

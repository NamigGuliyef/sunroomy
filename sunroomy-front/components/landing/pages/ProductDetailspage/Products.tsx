"use client";
import { IExtendedSubproduct, IProduct, IProducts, ISubProduct } from "@/types/types";
import { useRef, useState } from "react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductsItem from "../Productspage/ProductsItem";
import { ProductsNav } from "./ProductsNav";
import SubProductsItem from "../Productspage/SubProductsItem";

export default function ProductsSlider({ products }: { products: IProduct }) {
  const [_, setInit] = useState<boolean>();
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  return (
    <div className="font-sf font-semibold">
      <div className="flex flex-col gap-10">
        <div className="flex text-darkgray justify-between items-center">
          <h1 className="text-3.2xl md:text-5xl">{products.title}</h1>
          <div className="hidden md:flex gap-1 text-5xl">
            <div
              className={isFirstSlide ? "cursor-default" : "cursor-pointer"}
              ref={prevButtonRef}>
              <ProductsNav rotate={true} isFirst={isFirstSlide} />
            </div>
            <div
              className={isLastSlide ? "cursor-default" : "cursor-pointer"}
              ref={nextButtonRef}>
              <ProductsNav isLast={isLastSlide} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Swiper
          spaceBetween={24}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 2,
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
          }}>
          {products.subProductIds.map((item: any, idx) => (
            <SwiperSlide key={idx}>
              <SubProductsItem slider data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

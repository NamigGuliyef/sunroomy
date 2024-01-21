"use client";
import Image from "next/image";

export default function Hero({ photo }: { photo?: string }) {
  return (
    <div className="max-h-[320px] w-full overflow-hidden rounded-t-2xl lg:max-h-[510px] lg:rounded-t-section">
      <div className="relative h-[320px] lg:h-[610px]">
        <Image
          src="/images/about-us/hero.jpg"
          alt="Hero Image"
          fill
          priority
          quality={100}
          className="h-full w-full object-cover object-[25%] opacity-0 transition-all duration-200 md:object-left"
          onLoad={(image) => (image.currentTarget.style.opacity = "1")}
        />
      </div>
    </div>
  );
}

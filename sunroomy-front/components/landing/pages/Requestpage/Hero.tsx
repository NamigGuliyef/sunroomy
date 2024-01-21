"use client";
import Image from "next/image";

function Hero() {
  return (
    <div className="rounded-t-2xl w-full lg:rounded-t-section max-h-[320px] lg:max-h-[472px] overflow-hidden">
      <div className="relative h-[320px] lg:h-[472px]">
        <Image
          src="/images/request-page/hero.png"
          alt="Hero Image"
          fill
          quality={75}
          className="w-full h-full object-[25%] md:object-[25%_0%] object-cover opacity-0 transition-all duration-200"
          onLoad={(image) => (image.currentTarget.style.opacity = "1")}
        />
      </div>
    </div>
  );
}

export default Hero;

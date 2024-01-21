import Image from "next/image";

export default function Hero() {
  return (
    <div className="h-[720px] w-full bg-hero bg-cover bg-[50%_60%] pt-24 lg:h-screen">
      <div className="container flex h-full flex-col justify-between px-6 font-sf lg:px-0">
        <div className="relative mt-6 flex gap-5 text-[40px] capitalize lg:mt-32 lg:text-7xl">
          <div className="ltrim xs:max-w-sm max-w-[327px] leading-[115%]  text-white lg:max-w-[675px]">
            <span className="font-bold">live sustainable</span> feel the nature
            with
            <Image
              src="/images/logom1.svg"
              className="mb-2 ml-2 inline-block lg:hidden"
              width={56}
              height={56}
              loading="lazy"
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
        <div className="mb-16 flex flex-row justify-between md:mb-32">
          <div className="flex items-center gap-5">
            <div className="group cursor-pointer transition-all hover:invert">
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
                  stroke="#DEDEDE"
                  strokeWidth="1.5"
                />
                <path
                  d="M33.1138 21L49.5 38.5M33 55L49.5 37.5"
                  stroke="#DEDEDE"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <div className="flex flex-col font-sf text-xl text-white">
              <p className="font-light">Sunroom</p>
              <p className="font-bold">GALAX</p>
            </div>
          </div>
          <div className="hidden items-center">
            <Image
              src={"/images/main-page/arrowHero.svg"}
              alt="arrow"
              width={66}
              height={19}
              className="rotate-180 cursor-pointer opacity-50"
            />
            <Image
              src={"/images/main-page/arrowHero.svg"}
              alt="arrow"
              width={66}
              height={19}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

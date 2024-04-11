import Image from "next/image";

export default function FooterTop() {
  return (
    <div className="mb-12 mt-12 flex flex-col items-center justify-center gap-4 text-center md:mb-14 md:mt-[72px] md:gap-12 md:text-start">
      <Image
        src={"/images/logofullwhite.svg"}
        height={54}
        width={448}
        style={{
          height: 54,
          width: 448,
        }}
        className="block h-auto !w-3/5 md:w-[448px]"
        alt="logo"
      />
      {/* <Image
        src={"/images/footer/logoMobile.svg"}
        height={48}
        width={87}
        className="md:hidden block"
        alt="logo"
      /> */}
      <p className="text-sm font-light text-white md:text-base">
        Sustainable Outdoor Living Structures I Custom Pergolas, Sunrooms &
        Louvers
      </p>
      {/* Louvers & ADU Modules */}
    </div>
  );
}

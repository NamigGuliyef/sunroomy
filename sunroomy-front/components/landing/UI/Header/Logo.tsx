"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Logo({ scroll }: { scroll: boolean }) {
  const pathname = usePathname();
  const isHomeRoute = pathname === "/";

  // const className =
  //   (isHomeRoute && (scroll || !scroll)) || (!isHomeRoute && scroll)
  //     ? "invert"
  //     : "invert-0";

  return (
    <Link href={"/"} className={`transition-all duration-500`}>
      <Image
        alt="Sunroomy"
        src="/images/logom1.svg"
        width={40}
        height={40}
        style={{
          width: 40,
          height: 40,
        }}
        priority={true}
        className={`block ${!isHomeRoute && "!hidden"} ${
          scroll && "!hidden"
        } !h-[40px] transition-all duration-500 md:hidden`}
      />
      <Image
        alt="Sunroomy"
        src="/images/logom2.svg"
        width={40}
        height={40}
        style={{
          width: 40,
          height: 40,
        }}
        priority={true}
        className={`block ${isHomeRoute && "!hidden"} ${
          scroll && "!hidden"
        } !h-[40px] transition-all duration-500 md:hidden`}
      />
      <Image
        alt="Sunroomy"
        src="/images/logom1.svg"
        width={40}
        height={40}
        style={{
          width: 40,
          height: 40,
        }}
        priority={true}
        className={`block ${
          !scroll && "!hidden"
        } !h-[40px] transition-all duration-500 md:hidden`}
      />
      <Image
        alt="Sunroomy"
        src="/images/logofullwhite.svg"
        width={200}
        height={24}
        style={{
          width: 200,
          height: "auto",
        }}
        priority={true}
        className={`${scroll && "!hidden"} ${
          isHomeRoute && "md:block"
        } hidden w-full transition-all duration-500`}
      />
      <Image
        alt="Sunroomy"
        src="/images/logowhiteblue.svg"
        width={200}
        height={24}
        style={{
          width: 200,
          height: "auto",
        }}
        priority={true}
        className={`${!isHomeRoute && !scroll && "!hidden"} ${
          scroll && "md:block"
        } hidden w-full transition-all duration-500`}
      />
      <Image
        alt="Sunroomy"
        src="/images/logoblackblue.svg"
        width={200}
        height={24}
        style={{
          width: 200,
          height: "auto",
        }}
        priority={true}
        className={`${scroll && "!hidden"} hidden ${
          !isHomeRoute && "md:block"
        } w-full transition-all duration-500`}
      />
    </Link>
  );
}

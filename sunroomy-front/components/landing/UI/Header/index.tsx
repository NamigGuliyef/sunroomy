"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import UserMenu from "./UserMenu";
import useNav from "@/hooks/useNav";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { SessionProvider } from "next-auth/react";

export default function Header() {
  const pathname = usePathname();
  const [scroll, setScroll] = useState(false);
  const isHomeRoute = pathname === "/";
  const { setIsOpen } = useNav();
  const ref = useOutsideClick(() => {
    setIsOpen(false);
  });
  const className =
    isHomeRoute && scroll
      ? "bg-[#1d1d1d] !rounded-none"
      : isHomeRoute && !scroll
        ? "bg-transparent"
        : !isHomeRoute && scroll
          ? "bg-[#1d1d1d] !rounded-none"
          : "bg-transparent";
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY >= 30) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    }
    if (window.scrollY > 0) {
      handleScroll();
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <SessionProvider>
      <header
        className={`fixed z-50 px-6 lg:px-0 ${className} duration-[500] top-0 w-full transition-all ease-in-out`}
      >
        <nav
          ref={ref}
          className={`container relative mx-auto flex items-center justify-between py-6 lg:py-7`}
        >
          <Logo scroll={scroll} />
          <Navigation scroll={scroll} />
          <UserMenu classNameProp="flex" scroll={scroll} />
        </nav>
      </header>
    </SessionProvider>
  );
}

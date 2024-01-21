"use client";
import useNav from "@/hooks/useNav";
import { usePathname } from "next/navigation";
import LinkItem from "./LinkItem";
import { useSession } from "next-auth/react";

interface NavigationProps {
  scroll?: boolean;
}
export default function Navigation({ scroll }: NavigationProps) {
  const pathname = usePathname();
  const isHomeRoute = pathname === "/";
  const { isOpen } = useNav();
  const { data: session } = useSession();
  const className =
    (isHomeRoute && (scroll || !scroll)) || (!isHomeRoute && scroll)
      ? "!text-white"
      : "!text-white lg:!text-black";
  return (
    <div className={`ml-auto font-helvetica`}>
      <div
        className={`linear fixed -right-full top-0 flex w-2/3 flex-col-reverse justify-end bg-[#1d1d1d] pl-[5%] pr-[5%] pt-[10%] transition-all duration-300 max-[992px]:h-full sm:w-1/3 sm:pt-[5%] lg:static lg:w-full lg:justify-normal lg:bg-transparent lg:p-0 lg:duration-500 ${
          isOpen && "!right-0"
        } ${className}`}
      >
        <ul className="flex flex-col gap-9 border-t border-white border-opacity-20 pt-5 text-sm font-medium lg:mr-2 lg:flex-row lg:border-none lg:pt-0">
          <LinkItem to="/products/pergola">Sunroom</LinkItem>
          <LinkItem to="/products/louver">Louver</LinkItem>
          <LinkItem to="/products/pergola">Pergola</LinkItem>
          <LinkItem to="/products/blinds">Blinds</LinkItem>
          <LinkItem to="/products/windows-and-doors">Windows & Doors</LinkItem>
        </ul>
        <div
          className={`linear -right-full z-[5] pb-5 transition-all duration-300 lg:fixed lg:h-full lg:w-[32%] lg:bg-[#1d1d1d] lg:pb-0 lg:pl-[2%] lg:pr-[5%] lg:pt-[5%] lg:duration-500 xl:w-[25%] ${
            isOpen && "!right-0"
          } top-0`}
        >
          <ul className="flex flex-col gap-9 text-sm font-medium !text-white lg:font-light">
            <LinkItem className="lg:!text-3xl" to="/">
              Home
            </LinkItem>
            <LinkItem className="lg:!text-3xl" to="/projects">
              Projects
            </LinkItem>
            <LinkItem className="lg:!text-3xl" to="/about-us">
              About Us
            </LinkItem>
            <LinkItem className="lg:!text-3xl" to="/request">
              Request a project
            </LinkItem>
            <LinkItem className="lg:!text-3xl" to="/contacts">
              Contact Us
            </LinkItem>
            {session?.user && (
              <LinkItem className="lg:!text-3xl" to="/admin">
                Admin Dashboard
              </LinkItem>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

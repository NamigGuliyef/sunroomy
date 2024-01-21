"use client";
import { FaSquarePinterest, FaLinkedin } from "react-icons/fa6";
import Image from "next/image";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import Email from "./Email";

export default function Contacts() {
  return (
    <div className="grid grid-cols-1 pt-12 font-sf md:grid-cols-12 md:pt-0">
      <div className="grid grid-cols-2 gap-[72px] md:col-span-5">
        <div className="font-light text-white">
          <h2>Contact</h2>
          <p className="mt-6 text-xs opacity-60">
            3170 De La Cruz Blvd Suite 100,
            <br />
            Santa Clara, CA 95054
          </p>
        </div>
        <div className="self-end font-light text-white">
          <p className="mt-6 text-xs opacity-60">
            info@sunroomy.com
            <br />
            +1 (669) 301 0915
          </p>
        </div>
      </div>
      <div className="my-12 font-light text-white md:col-span-3 md:my-0">
        <h1 className="mb-6 md:mb-10 lg:mb-6">Follow us</h1>
        <ul className="flex flex-row gap-8 text-lg text-white">
          <li>
            <Link href={"#"}>
              <FaInstagram />
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <FaFacebookSquare />
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <FaLinkedin />
            </Link>
          </li>
          <li>
            <Link href={"#"}>
              <FaSquarePinterest />
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col text-white md:col-span-3 md:col-start-9 md:h-full md:justify-between">
        <h1 className="font-light">Subscribe</h1>
        <Email />
      </div>
    </div>
  );
}

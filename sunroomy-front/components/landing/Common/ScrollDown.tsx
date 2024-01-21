'use client'
import { Link } from "react-scroll";

export default function ScrollDown() {
  return (
    <div className="hidden lg:flex gap-4 font-sf font-light items-center">
      <div className="group w-fit cursor-pointer hover:invert transition-all duration-500">
        <Link
          to="request"
          offset={-200}
          smooth={true}
          duration={400}
          isDynamic={false}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="white">
            <circle
              cx="32"
              cy="32"
              r="31.25"
              transform="rotate(90 32 32)"
              className="stroke-[#DEDEDE] bg-white"
              strokeWidth="1.5"
            />
            <path
              d="M46.3164 27.8854L31.5796 41.6843M17.6848 27.7895L32.4217 41.6843"
              className="stroke-black"
              strokeWidth="1.5"
            />
          </svg>
        </Link>
      </div>
      <h2 className="text-2xl">Scroll Down</h2>
    </div>
  );
}

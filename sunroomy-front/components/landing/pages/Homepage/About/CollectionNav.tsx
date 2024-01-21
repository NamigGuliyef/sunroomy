import { forwardRef } from "react";

export const CollectionNav = forwardRef<
  HTMLDivElement,
  {
    isFirst?: boolean;
    isLast?: boolean;
    rotate?: boolean;
  }
>(({ isFirst, isLast, rotate }, ref) => (
  <div
    ref={ref}
    className={`w-10 h-10 ${rotate && "rotate-180"} rounded-full flex group ${
      isFirst || isLast ? "" : "hover:bg-mainblack"
    } transition-all duration-500 text-white items-center bg-transparent justify-center border-2 ${
      isFirst || isLast ? "border-[#BBBBBB]" : "border-mainblack"
    }`}>
    <svg
      width="15"
      height="12"
      viewBox="0 0 17 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        className={`${
          isFirst || isLast ? "stroke-[#BBBBBB]" : "stroke-mainblack"
        } ${isFirst || isLast ? "" : "group-hover:stroke-white"}`}
        d="M0.578125 6.73633H15.5781M15.5781 6.73633L9.68527 0.736328M15.5781 6.73633L9.68527 12.7363"
        strokeWidth="2"
      />
    </svg>
  </div>
));

CollectionNav.displayName = "CollectionNav";

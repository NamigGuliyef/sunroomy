import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

interface RequestProps {
  size?: "lg" | "sm" | undefined;
}
const Request: React.FC<RequestProps> = ({ size }) => {
  return (
    <div
      id="request"
      className={`flex w-full flex-col rounded-2.5xl bg-[#1D1D1D] p-5 font-sf font-light md:items-center md:py-14 ${
        size === "lg" ? "max-w-full" : "max-w-[648px]"
      }`}
    >
      <h1 className="text-xl text-secondarygray sm:text-2xl">
        Couldn’t Find What You Are Looking For ?
      </h1>
      <div className="mb-11 mt-3 text-base font-light leading-[150%] text-white md:mt-6 md:text-center">
        <p>
          We are always ready to help you to get the best out of our services
        </p>
        <p className="text-lightblue">7 / 24 Active Service</p>
      </div>
      <form className="relative flex h-[65px] w-full max-w-[285px] self-center overflow-hidden rounded-[100px] bg-white md:self-auto">
        <input
          disabled
          type="text"
          className="w-[200px] border-none bg-white pl-9 font-helvetica text-lg outline-none placeholder:text-[#161618] placeholder:transition-all placeholder:duration-500 focus:outline-none focus:ring-0 focus:placeholder:opacity-0"
          name="Request"
          placeholder="Contact Us"
          id="Request"
        />
        <Link
          href={"/contact-us"}
          className="bo group absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer rounded-[100px] border bg-black px-6 py-6 text-white hover:bg-black/90"
        >
          <FaChevronRight size={12} className="text-white " />
        </Link>
      </form>
    </div>
  );
};

export default Request;

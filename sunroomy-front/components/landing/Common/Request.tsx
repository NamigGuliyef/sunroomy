import Link from "next/link";
import { FaChevronRight } from "react-icons/fa";

interface RequestProps {
  size?: "lg" | "sm" | undefined;
}
const Request: React.FC<RequestProps> = ({ size }) => {
  return (
    <div
      id="request"
      className={`rounded-2.5xl font-sf flex md:items-center p-5 md:py-14 font-light flex-col w-full bg-[#1D1D1D] ${
        size === "lg" ? "max-w-full" : "max-w-[648px]"
      }`}
    >
      <h1 className="text-xl sm:text-2xl text-secondarygray">
        Couldn’t Find What You Are Looking For ?
      </h1>
      <div className="leading-[150%] md:text-center text-white mt-3 md:mt-6 mb-11 text-base font-light">
        <p>
          We are always ready to help you to get the best out of our services
        </p>
        <p className="text-lightblue">7 / 24 Active Service</p>
      </div>
      <form className="w-full overflow-hidden self-center md:self-auto relative h-[65px] flex bg-white rounded-[100px] max-w-[285px]">
        <input
          disabled
          type="text"
          className="bg-white placeholder:transition-all focus:ring-0 border-none placeholder:duration-500 focus:placeholder:opacity-0 w-[200px] pl-9 text-lg font-helvetica focus:outline-none placeholder:text-[#161618] outline-none"
          name="Request"
          placeholder="Request a Project"
          id="Request"
        />
        <Link
          href={"/contacts"}
          className="bg-black px-6 py-6 group hover:bg-black/90 cursor-pointer border bo text-white rounded-[100px] absolute right-1 top-1/2 -translate-y-1/2"
        >
          <FaChevronRight size={12} className="text-white " />
        </Link>
      </form>
    </div>
  );
};

export default Request;

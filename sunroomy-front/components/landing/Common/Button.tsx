import Link from "next/link";
import { IoChevronForwardSharp } from "react-icons/io5";
interface IButton {
  children: React.ReactNode;
  className: string;
  dark?: boolean;
  to: string | "#";
  onClick?: () => void;
}
export default function Button({ children, className, dark, to, onClick }: IButton) {
  return (
    <Link
      onClick={onClick}
      href={to ? to : "#"}
      className={`${className} ${
        dark
          ? "bg-black text-white border-2 hover:text-black border-black hover:bg-white"
          : "bg-white text-darkgray hover:text-white border-2 hover:bg-darkgray border-darkgray"
      } transition-all duration-500 cursor-pointer rounded-full`}>
      <div className="flex items-center h-[21px] justify-between">
        {children}
        <IoChevronForwardSharp size={20} />
      </div>
    </Link>
  );
}

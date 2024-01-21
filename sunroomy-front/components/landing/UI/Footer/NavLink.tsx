import Link from "next/link";
 ;
import { HiOutlineChevronRight } from "react-icons/hi";

interface NavLinkProps {
  children: React.ReactNode;
  to: string;
}
const NavLink: React.FC<NavLinkProps> = ({ children, to }) => {
  return (
    <li className="col-span-2 cursor-pointer">
      <Link href={to} className="flex items-center text-white flex-row gap-4">
        {children}
        <HiOutlineChevronRight />
      </Link>
    </li>
  );
};

export default NavLink;

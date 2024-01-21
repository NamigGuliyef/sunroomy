;
import useNav from "@/hooks/useNav";
import Link from "next/link";

interface LinkItemProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const LinkItem: React.FC<LinkItemProps> = ({ to, className, children }) => {
  const { isOpen, setIsOpen } = useNav();
  const handleClick = () => {
    setIsOpen(false);
  };
  return (
    <li
      className={`after:content-[''] ${className} w-fit text-base lg:text-sm after:-bottom-1 after:left-0 after:h-[2px] after:transition-all after:duration-500 after:w-full lg:hover:after:scale-x-100 after:scale-x-0 relative after:absolute after:bg-white after:opacity-20 after:origin-left`}>
      <Link onClick={handleClick} href={to}>
        {children}
      </Link>
    </li>
  );
};

export default LinkItem;

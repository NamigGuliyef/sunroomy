import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
interface LinkArrowProps {
  to: string;
  before: boolean;
  children: React.ReactNode;
  className?: string;
}
const LinkArrow: React.FC<LinkArrowProps> = ({
  to,
  before,
  children,
  className,
}) => {
  return (
    <div
      className={`${className} text-lg gap-2 items-center text-lightblue ${
        before ? "flex-row-reverse" : "flex-row"
      } flex`}
    >
      <Link href={to} className={`font-sf font-semibold`}>
        {children}
      </Link>
      <FaArrowRight />
    </div>
  );
};

export default LinkArrow;

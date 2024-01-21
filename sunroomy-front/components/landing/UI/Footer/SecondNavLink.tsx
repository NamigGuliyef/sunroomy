import Link from "next/link";
 ;

interface SecondNavLinkProps {
  to: string
  children: React.ReactNode;
}
const SecondNavLink: React.FC<SecondNavLinkProps> = ({ children, to }) => {
  return (
    <li className="text-sm md:text-base text-white">
      <Link href={to}>{children}</Link>
    </li>
  );
};

export default SecondNavLink;

 ;
import NavLink from "./NavLink";

const LINKS = [
  {
    id: 1,
    text: "Pergolas",
    to: "/products/pergola",
  },
  {
    id: 2,
    text: "Sunrooms",
    to: "/products/sunrooms",
  },
  {
    id: 3,
    text: "Louvers",
    to: "/products/louvers",
  },
  {
    id: 4,
    text: "Blinds",
    to: "/products/blinds",
  },
  {
    id: 5,
    text: "Window & Doors",
    to: "/products/windows-and-doors",
  },
  {
    id: 6,
    text: "ADU Modules",
    to: "/products/adu_modules",
  },
];

const Nav = () => {
  return (
    <ul className="flex flex-row sm:justify-center flex-wrap gap-4 md:justify-center resize-none min-[996px]:gap-[72px] font-light border-t border-b border-white mb-12 py-12 md:mb-14 md:py-14">
      {LINKS.map((link) => (
        <NavLink to={link.to.toString()} key={link.id}>{link.text}</NavLink>
      ))}
    </ul>
  );
};

export default Nav;

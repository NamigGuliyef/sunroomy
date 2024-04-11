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
    to: "/products/sunroom",
  },
  {
    id: 3,
    text: "Louvers",
    to: "/products/louver",
  },
  {
    id: 4,
    text: "Blinds",
    to: "/products/blinds",
  },
  {
    id: 5,
    text: "Doors & Windows",
    to: "/products/doors-and-windows",
  },
  // {
  //   id: 6,
  //   text: "ADU Modules",
  //   to: "/products/adu-modules",
  // },
];

const Nav = () => {
  return (
    <ul className="mb-12 flex resize-none flex-row flex-wrap gap-4 border-b border-t border-white py-12 font-light sm:justify-center md:mb-14 md:justify-center md:py-14 min-[996px]:gap-[72px]">
      {LINKS.map((link) => (
        <NavLink to={link.to.toString()} key={link.id}>
          {link.text}
        </NavLink>
      ))}
    </ul>
  );
};

export default Nav;

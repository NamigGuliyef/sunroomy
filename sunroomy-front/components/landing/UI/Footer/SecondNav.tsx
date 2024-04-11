import SecondNavLink from "./SecondNavLink";

const LINKS = [
  {
    id: 1,
    text: "About Us",
    to: "/about-us",
  },
  {
    id: 2,
    text: "Our Projects",
    to: "/projects",
  },
  {
    id: 3,
    text: "Request Now",
    to: "/request-a-quote",
  },
  {
    id: 4,
    text: "Tailored Design",
    to: "/contact-us",
  },
];

export default function SecondNav() {
  return (
    <ul className="flex flex-wrap items-center gap-8 border-b border-white pb-12 pr-16 font-sf font-light sm:justify-center sm:pr-0 md:gap-16 md:border-none md:pb-24 lg:flex-nowrap">
      {LINKS.map((link) => (
        <SecondNavLink to={link.to} key={link.id}>
          {link.text}
        </SecondNavLink>
      ))}
    </ul>
  );
}

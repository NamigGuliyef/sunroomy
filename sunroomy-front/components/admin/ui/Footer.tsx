import Link from "next/link";

export default function FooterAdmin() {
  return (
    <footer>
      <div
        className="
        container
        flex flex-col flex-wrap
        px-4
        font-helvetica
        mt-8
        mx-auto
        md:items-center
        lg:items-start
        md:flex-row md:flex-nowrap
      "
      >
        <div className="justify-center w-full mt-4 text-start lg:flex">
          <div className="w-1/2 px-4">
            <ul className="mb-8 space-y-2 text-xl list-none">
              <li>
                <Link href={"./"} className="text-black-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href={"./about"} className="text-black-300">
                  About
                </Link>
              </li>
              <li>
                <Link href={"./products"} className="text-black-300">
                  Products
                </Link>
              </li>
              <li>
                <Link href={"./subproducts"} className="text-black-300">
                  Subproducts
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-1/2 px-4">
            <ul className="mb-8 space-y-2 text-xl list-none">
              <li>
                <Link href={"./projects"} className="text-black-300">
                  Projects
                </Link>
              </li>
              <li>
                <Link href={"./subscribers"} className="text-black-300">
                  Subscribers
                </Link>
              </li>
              <li>
                <Link href={"./notify"} className="text-black-300">
                  Notify
                </Link>
              </li>
              <li>
                <Link href={"./features"} className="text-black-300">
                  Features
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

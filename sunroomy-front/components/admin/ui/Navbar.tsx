"use client";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { User } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

function Header({ user }: { user: User | undefined }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = [
    { title: "Home", href: "/admin/dashboard/" },
    { title: "Projects", href: "/admin/dashboard/projects" },
    { title: "Products", href: "/admin/dashboard/products" },
    { title: "Subproducts", href: "/admin/dashboard/subproducts" },
    { title: "About", href: "/admin/dashboard/about" },
  ];
  const handleLogin = () => {
    signIn();
  };

  return (
    <Navbar
      className="font-helvetica"
      maxWidth="xl"
      classNames={{ base: "relative", menu: "right-0 inset-x-auto" }}
    >
      <NavbarContent>
        <NavbarBrand>
          <Link href="/">
            <Image
              width={160}
              alt=""
              height={70}
              src="/images/logofullblack.svg"
              style={{
                width: 160,
                height: 70,
              }}
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {menuItems.map((menuItem, idx) => (
          <NavbarItem key={idx}>
            <Link color="primary" href={menuItem.href}>
              {menuItem.title}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        {user ? (
          <>
            <Dropdown aria-valuetext="" placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  as="button"
                  className="border-2 border-[#3F3F46] transition-transform"
                  name={user?.email!}
                  size="md"
                  src={"/placeholder.jpg"}
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-valuetext=""
                aria-label="Profile Actions"
                variant="flat"
              >
                <DropdownItem
                  onClick={() => signOut()}
                  key="logout"
                  aria-valuetext=""
                  color="danger"
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        ) : (
          <NavbarItem className="">
            <Button
              as={Link}
              onClick={handleLogin}
              color="primary"
              variant="shadow"
            >
              Sign In
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu className="right-0 w-1/5">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={"foreground"}
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default Header;

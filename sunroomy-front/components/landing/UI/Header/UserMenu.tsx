"use client";
import { useDebounce } from "@/hooks/useDebounce";
import useNav from "@/hooks/useNav";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Preloader from "../../Common/Preloader";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import Link from "next/link";

export default function UserMenu({
  scroll,
  classNameProp,
}: {
  scroll: boolean;
  classNameProp: string;
}) {
  const { isOpen, setIsOpen } = useNav();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const pathname = usePathname();
  const isHomeRoute = pathname === "/";
  const className =
    (isHomeRoute && (scroll || !scroll)) || (!isHomeRoute && scroll)
      ? "invert-0"
      : "invert";
  const ref = useOutsideClick(() => {
    setIsSearching(false);
    setSearchValue("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  });
  const handleSearchToggle = () => {
    setIsSearching(!isSearching);
    setSearchValue("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const handleClose = () => {
    setIsSearching(false);
    setSearchValue("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const variant = isOpen ? "opened" : "closed";
  const top = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: 45,
      translateY: 6,
      scale: 0.8,
    },
  };
  const center = {
    closed: {
      opacity: 1,
    },
    opened: {
      opacity: 0,
    },
  };
  const bottom = {
    closed: {
      rotate: 0,
      translateY: 0,
    },
    opened: {
      rotate: -45,
      translateY: -6,
      scale: 0.8,
    },
  };
  const debouncedSearchValue = useDebounce(searchValue, 300);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    setLoading(true);
    const fetchSearchResults = async () => {
      try {
        const trimmedQuery = debouncedSearchValue.trim();
        if (trimmedQuery !== "") {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/q`,
            {
              params: {
                title: trimmedQuery,
              },
            },
          );

          if (response.status === 200) {
            setSearchResults(response.data);
            (response.data);
          } else {
            console.error(
              "Error fetching search results:",
              response.statusText,
            );
          }
        } else {
          setLoading(false);
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [debouncedSearchValue]);
  return (
    <div ref={ref} className={`flex items-center gap-6 ${classNameProp}`}>
      <AnimatePresence>
        <motion.form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="relative hidden items-center lg:flex"
        >
          <motion.input
            type="text"
            ref={inputRef}
            onChange={handleSearchChange}
            disabled={isSearching ? false : true}
            className={`h-8 outline-none ${className} pl-10 ${
              isSearching && "pl-8"
            } focus:outline-none focus-visible:border-white focus-visible:ring-0`}
            initial={{ opacity: 0, width: 25 }}
            animate={{
              opacity: isSearching ? 0.75 : 0,
              borderRadius: 200,
              color: "#ffffffa8",
              backgroundColor: "#111",
              width: isSearching ? 178 : 25,
              originX: 100,
              transitionDuration: "1s",
              transition: {
                staggerChildren: 2,
                when: "beforeChildren",
              },
            }}
          />

          <motion.div
            transition={{ delay: 0.4 }}
            initial={{ borderRadius: 15 }}
            animate={{
              opacity: debouncedSearchValue.length > 0 ? 1 : 0,
              transitionDuration: "2s",
              transition: {
                when: "beforeChildren",
              },
            }}
            className={`absolute top-[125%] hidden max-h-72 w-full overflow-scroll border border-slate-400/50 scrollbar-hide ${
              isSearching && "!block"
            } bg-white text-darkgray transition-all`}
          >
            {searchResults && searchResults?.length > 0 ? (
              searchResults?.map((result, idx) => {
                let href = "";

                if (result.usedProductsId) {
                  href = `/projects/${result.slug}`;
                } else if (result.productId) {
                  href = `/products/subproducts/${result.slug}`;
                } else if (result.subProductIds) {
                  href = `/products/${result.slug}`;
                }

                return (
                  <Link
                    href={href}
                    key={idx}
                    className="block h-full w-full px-4 py-2 font-medium transition-all duration-200 hover:bg-gray-300"
                  >
                    {result.title}
                  </Link>
                );
              })
            ) : loading ? (
              <div className="flex h-32 w-full cursor-default items-center justify-center p-1 px-4 text-sm transition-all">
                <div className="scale-50">
                  <Preloader />
                </div>
              </div>
            ) : (
              <div className="flex h-32 w-full items-center justify-center px-4 py-2 font-normal transition-all duration-200">
                Not Found
              </div>
            )}
          </motion.div>
          <motion.img
            src={"/images/header/Search.svg"}
            onClick={isSearching === false ? handleSearchToggle : () => {}}
            height={17}
            width={17}
            className={`${className} z-1 duration-500 ${
              isSearching && "opacity-100 invert"
            } absolute cursor-pointer transition-all`}
            initial={{
              opacity: 1,
              left: "70%",
              right: "0%",
              top: "50%",
              translateY: "-50%",
            }}
            animate={{
              opacity: isSearching ? 0.75 : 1,
              left: isSearching ? "5%" : "70%",
              right: isSearching ? "100%" : "0%",
            }}
            exit={{ opacity: 1, left: "70%", right: "0%" }}
            transition={{ duration: 0.2 }}
            alt="hamburger"
          />
          <motion.img
            src={"/images/header/X.svg"}
            onClick={handleClose}
            height={12}
            initial={{
              display: "none",
              opacity: 0.7,
            }}
            animate={{
              display: isSearching ? "block" : "none",
            }}
            transition={{ delay: isSearching ? 0.4 : 0 }}
            className={`${className} absolute top-1/2 ${
              isOpen && "invert"
            } right-2 -translate-y-1/2 cursor-pointer`}
            width={12}
          />
        </motion.form>
      </AnimatePresence>
      <div
        className={`relative z-10 cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          animate={variant}
          viewBox="0 0 28 28"
          className={`${className} ${
            isOpen && "invert-0"
          } transition-all duration-500`}
          fill="none"
        >
          <motion.path
            variants={top}
            d="M2 8H26"
            stroke="white"
            strokeWidth="2"
          />
          <motion.path
            variants={center}
            d="M2 14H26"
            stroke="white"
            strokeWidth="2"
          />
          <motion.path
            variants={bottom}
            d="M2 20H26"
            stroke="white"
            strokeWidth="2"
          />
        </motion.svg>
      </div>
    </div>
  );
}

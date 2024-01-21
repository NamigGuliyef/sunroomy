"use client";
import React from "react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaChevronRight } from "react-icons/fa6";
import Image from "next/image";
const Email = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.length <= 0) {
      setErrorMessage("Email is required");
    } else {
      setErrorMessage(null);
    }
    axios
      .post(process.env.NEXT_PUBLIC_BACKEND_URL + "/subscribers", {
        email,
      })
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          toast.success("Subscribed successfully", {
            style: {
              border: "1px solid black",
            },
          });
        } else {
          return;
        }
      })
      .catch((err) => {
        if (err.response.status === 409) {
          toast.success("You've already signed up for the newsletter!");
        } else {
          toast.error("Unexpected error: " + err.response.status);
        }
      });
  };
  return (
    <form
      onSubmit={onSubmit}
      className="relative border-b-[0.5px] border-b-white border-opacity-30 md:w-[230px] lg:w-[304px] "
    >
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        className="placeholder:font-fs border-none bg-transparent py-3 pl-8 outline-none placeholder:text-sm placeholder:opacity-40 placeholder:transition-all focus:border-none focus:!outline-none focus:ring-0 focus:placeholder:opacity-60 w-11/12"
        placeholder="Enter your email address"
      />
      <Image
        src={"/images/footer/Email.svg"}
        width={22}
        height={18}
        alt="Email"
        className="absolute left-0 top-1/2 h-auto w-auto -translate-y-1/2"
      />
      <button type="submit">
        <FaChevronRight
          size={14}
          color="white"
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer lg:right-1"
        />
      </button>
      {errorMessage && (
        <div className="absolute mt-2 text-sm text-red-600 opacity-70">
          {errorMessage}
        </div>
      )}
    </form>
  );
};

export default Email;

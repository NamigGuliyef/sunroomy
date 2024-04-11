import { FaSquarePinterest, FaLinkedin, FaSquareYoutube, FaYoutube } from "react-icons/fa6";
import Image from "next/image";
import { FaFacebookSquare, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import Email from "./Email";
import axios from "axios";

const getContacts = async () => {
  const res = await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contacts`)
    .then((res) => res.data[0]);

  return res;
};
const getFollowUs = async () => {
  const res = await axios
    .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/followUs`)
    .then((res) => res.data);
  (res);

  return res;
};

export default async function Contacts() {
  const contactData = await getContacts();
  const followUs = await getFollowUs();
  return (
    <div className="grid grid-cols-1 pt-12 font-sf md:grid-cols-12 md:pt-0">
      <div className="grid grid-cols-2 gap-[72px] md:col-span-5">
        <div className="font-light text-white">
          <h2>Contact</h2>
          <p className="mt-6 w-[155px] text-xs opacity-60 max-[340px]:w-[140px]">
            {contactData.location}
          </p>
        </div>
        <div className="self-end font-light text-white">
          <p className="mt-6 text-xs opacity-60">
            {contactData.email}
            <br />
            {contactData.phone}
          </p>
        </div>
      </div>
      <div className="my-12 font-light text-white md:col-span-3 md:my-0">
        <h1 className="mb-6 md:mb-10 lg:mb-6">Follow us</h1>
        <ul className="flex flex-row gap-8 text-lg text-white">
          {followUs.map((platform: any) => (
            <li key={platform._id}>
              <Link href={platform.link}>
                {platform.name.toLowerCase() === "instagram" && <FaInstagram />}
                {platform.name.toLowerCase() === "facebook" && (
                  <FaFacebookSquare />
                )}
                {platform.name.toLowerCase() === "linkedin" && <FaLinkedin />}
                {platform.name.toLowerCase() === "pinterest" && (
                  <FaSquarePinterest />
                )}
                {platform.name.toLowerCase() === "youtube" && (
                  <FaYoutube />
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col text-white md:col-span-3 md:col-start-9 md:h-full md:justify-between">
        <h1 className="font-light">Subscribe</h1>
        <Email />
      </div>
    </div>
  );
}

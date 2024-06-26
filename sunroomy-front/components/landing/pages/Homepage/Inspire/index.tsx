"use client";
import LinkArrow from "@/components/landing/Common/LinkArrow";
import { IContact, IInspire } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import NextJsImage from "@/components/landing/Common/NextJSImage";

export default function Inspire({ data, contact }: { data: IInspire; contact: IContact }) {
  const { photos } = data;
  const [open, setOpen] = useState<boolean>(false);
  const [index, setIndex] = useState(0);
  const slides = photos.map((photo) => ({
    width: 1300,
    height: 1300,
    src: photo,
  }));
  return (
    <>
      <Lightbox
        open={open}
        index={index}
        on={{ view: ({ index: currentIndex }) => setIndex(currentIndex) }}
        close={() => setOpen(false)}
        slides={slides}
        render={{ slide: NextJsImage, thumbnail: NextJsImage }}
        plugins={[Thumbnails]}
      />
      <div className="container px-6 pb-24 font-sf lg:px-0">
        <h1 className="mb-12 text-3.2xl font-semibold text-darkgray md:mb-9 md:text-5xl">
          Let Us Inspire You!
        </h1>
        <div className="hidden max-h-[715px] grid-cols-3 gap-6 lg:grid">
          <div
            onClick={() => {
              setIndex(0);
              setOpen(true);
            }}
            className="group overflow-hidden rounded-2xl lg:rounded-2.5xl"
          >
            <Image
              alt="image"
              src={data.photos[0]}
              className="h-full max-h-[715px] w-full rounded-2xl transition-all group-hover:scale-105 group-hover:cursor-pointer md:object-cover lg:rounded-2.5xl xl:h-full"
              width={424}
              height={715}
            />
          </div>
          <div className="grid md:gap-6 lg:gap-9">
            <div
              className="group overflow-hidden rounded-2xl lg:rounded-2.5xl"
              onClick={() => {
                setIndex(1);
                setOpen(true);
              }}
            >
              <Image
                alt="Image"
                src={data.photos[1]}
                width={424}
                className="h-[283px] w-full object-cover transition-all group-hover:scale-105 group-hover:cursor-pointer"
                height={283}
              />
            </div>
            <div className="flex flex-col items-start justify-start gap-3 rounded-2xl bg-secondarygray p-4 lg:rounded-2.5xl lg:p-6">
              <div>
                <h2
                  className="text-xl font-light text-darkgray lg:text-2xl"
                  dangerouslySetInnerHTML={{ __html: data.title }}
                ></h2>
                <p className="mb-3 w-7/12 font-light leading-[150%] text-black opacity-60">
                  {data.description}
                </p>
              </div>
              <Link href={"/contacts"} className="ml-auto block">
                <div className="hover:inspireHover flex cursor-pointer flex-col rounded-full bg-mainblack p-6 transition lg:p-11 xl:p-[72px]">
                  <Image
                    src="/images/main-page/msg.svg"
                    alt="MSG"
                    width={59}
                    className="md:h-8 md:w-8 xl:h-[59px] xl:w-[59px]"
                    height={59}
                  />
                </div>
              </Link>
            </div>
          </div>
          <div className="grid-rows-[2fr, 1fr] lg:grid-rows-[3fr, 1fr] grid">
            <Image
              alt="Image"
              src={data.photos[2]}
              className="h-full hover:scale-[101%] transition-all cursor-pointer max-h-[587px] w-full grow rounded-2xl object-cover object-center lg:rounded-2.5xl lg:object-cover xl:h-[587px]"
              width={424}
              height={587}
              onClick={() => {
                setIndex(2);
                setOpen(true);
              }}
            />
            <LinkArrow
              className="mr-auto mt-auto md:mt-0"
              to="/projects"
              before
            >
              See All Our Projects
            </LinkArrow>
          </div>
        </div>
        <div className="grid grid-cols-[1fr] gap-6 sm:grid-cols-[1fr_1fr] sm:grid-rows-[1fr_1fr] lg:hidden">
          <div className="max-h-[327px] overflow-hidden rounded-2xl sm:max-h-[400px]">
            <Image
              alt="image"
              src={"/images/main-page/inspire-3.png"}
              className="h-full max-h-[327px] w-full rounded-2xl object-cover object-[45%_75%] max-[440px]:min-w-[327px] min-[440px]:max-h-fit"
              width={424}
              height={715}
            />
          </div>
          <div className="max-h-[327px] overflow-hidden rounded-2xl sm:max-h-[400px]">
            <Image
              alt="image"
              src={"/images/main-page/inspire-1.png"}
              className="h-full max-h-[327px] w-full rounded-2xl object-cover object-[45%_75%] max-[440px]:min-w-[327px] min-[440px]:max-h-fit"
              width={424}
              height={715}
            />
          </div>
          <div className="flex max-h-[327px] flex-col items-start justify-start gap-3 rounded-2xl bg-secondarygray p-5 sm:max-h-[400px] lg:rounded-2.5xl">
            <div>
              <h2 className="text-xl text-darkgray lg:text-2xl">
                Do you have a new project ? <br /> Talk to our sales experts now
              </h2>
              <p className="mb-3 w-9/12 font-light leading-[150%] text-black opacity-60">
                Please join to the hot line <br /> or call to {contact.phone}
              </p>
            </div>
            <div className="ml-auto flex flex-col rounded-full bg-mainblack p-[45px]">
              <Image
                src="/images/main-page/msg.svg"
                alt="MSG"
                width={59}
                className="h-[44px] w-[44px]"
                height={59}
              />
            </div>
          </div>
          <div className="h-full max-h-[327px] overflow-hidden rounded-2xl sm:max-h-[400px]">
            <Image
              alt="image"
              src={"/images/main-page/inspire-2.png"}
              className="h-full min-h-[327px] w-full rounded-2xl object-cover object-[45%_75%] max-[440px]:min-w-[327px] min-[440px]:max-h-fit"
              width={424}
              height={587}
            />
          </div>
          <LinkArrow
            className="mt-auto flex w-full cursor-pointer justify-center rounded-full border-2 border-lightblue py-3 text-lg transition-all duration-500 hover:bg-lightblue hover:text-white md:mt-0"
            to="/projects"
            before
          >
            See All Our Projects
          </LinkArrow>
        </div>
      </div>
    </>
  );
}

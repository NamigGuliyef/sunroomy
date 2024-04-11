"use client";
import Image from "next/image";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import NextJsImage from "../../Common/NextJSImage";

const UsedProductsImage = ({ src }: { src: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[
          {
            src: src,
            height: 648,
            width: 648,
          },
        ]}
        render={{ slide: NextJsImage }}
      />
      <div onClick={() => setOpen(true)} className="order-1 cursor-pointer group max-h-[327px] overflow-hidden rounded-[30px] sm:max-h-[450px] md:order-2 md:max-h-[648px] md:w-1/2">
        <Image
          alt="Inspire"
          src={src}
          className="block aspect-auto group-hover:scale-105 cursor-pointer transition-all duration-500 h-full max-h-full w-full object-cover md:object-cover"
          height={648}
          width={648}
        />
      </div>
    </>
  );
};

export default UsedProductsImage;

import React from "react";

interface IHeadingProps {
  title: string;
  description: string;
}

const Heading = ({ title, description }: IHeadingProps) => {
  return (
    <>
      <h1 className="font-sf font-bold  md:font-normal text-3.2xl leading-[95%] sm:text-5xl md:text-7.2xl text-darkgray">
        {title}
      </h1>
      <p className="font-sf text-lg mt-12 md:mt-14 md:text-3.2xl text-darkgray leading-[125%]">
        {description}
      </p>
    </>
  );
};

export default Heading;

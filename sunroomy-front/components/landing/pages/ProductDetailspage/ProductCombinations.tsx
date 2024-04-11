import { ISubProductCustom } from "@/types/types";
import Image from "next/image";
import Section from "../../UI/Section";
import { cn } from "@/lib/utils";

const ProductCombinations = ({ data }: { data: ISubProductCustom }) => {
  return (
    <Section className="container px-6 text-darkgray lg:px-0">
      <h1 className="mb-8 text-3.2xl font-semibold leading-[125%] text-darkgray md:text-5xl">
        Custom Combinations
      </h1>
      <p className="text-xl leading-[125%] lg:text-2xl">{data.description}</p>
      {/* 
      
      className={cn(
          "mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 lg:gap-20",
          data.itemIds.length >= 5 ? "grid-rows-2" : "grid-rows-1",
        )}*/}
      <div
        className={cn(
          "mt-20 grid grid-cols-1 gap-x-[50px] gap-y-[56px] md:grid-cols-2",
          data.itemIds.length >= 3
            ? "grid-rows-1 md:grid-rows-2"
            : "grid-rows-1 md:grid-rows-1",
        )}
      >
        {data.itemIds.map((custom, idx) => (
          <div
            key={idx}
            className=" rounded-[30px] border-2 border-[#BABABA] lg:min-h-fit"
          >
            <div className="mx-auto mb-4 mt-2 w-11/12">
              <Image
                alt=""
                width={500}
                height={500}
                className="mx-auto h-full w-full object-scale-down sm:h-5/6 sm:w-5/6 md:h-full md:w-full"
                src={custom.photo}
              />
            </div>
            <div
              id="text"
              className="mx-6 mb-6 text-justify text-base md:mx-9 md:mb-9 md:leading-6"
              dangerouslySetInnerHTML={{ __html: custom.description }}
            ></div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ProductCombinations;

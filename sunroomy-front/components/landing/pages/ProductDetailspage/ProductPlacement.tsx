import Image from "next/image";
import Section from "../../UI/Section";
import { ISubProductPlacement, ISubProductPlacementItem } from "@/types/types";
import { cn } from "@/lib/utils";

const ProductPlacement = ({ data }: { data: ISubProductPlacement }) => {
  return (
    <Section className="container px-6 text-darkgray lg:px-0">
      <h1 className="mb-8 text-3.2xl  font-semibold leading-[125%] text-darkgray md:text-5xl">
        Individual Placement Options
      </h1>
      <p className="text-xl leading-[125%] lg:text-2xl">{data.description}</p>
      {/* 4 6 8 */}
      <div
        className={cn("mt-16 flex flex-wrap justify-center gap-6 md:gap-12")}
      >
        {data.itemIds.map((item: ISubProductPlacementItem) => (
          <div
            key={item._id}
            className="flex w-[calc(100%/4-3rem)] flex-col items-center justify-center gap-8"
          >
            <div className="flex items-center">
              <Image src={item.photo} height={205} width={205} alt="" />
            </div>
            <h2
              dangerouslySetInnerHTML={{ __html: item.description }}
              className="text-center text-lg leading-[125%] md:text-xl lg:text-2xl"
            ></h2>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ProductPlacement;

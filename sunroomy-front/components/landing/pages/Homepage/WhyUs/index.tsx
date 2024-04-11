import Image from "next/image";
import Heading from "./Heading";
import WhyItemsContainer from "./WhyItemsContainer";
import { IWhyUs } from "@/types/types";
import { cn } from "@/lib/utils";

const WhyUs = ({
  data,
  variant,
}: {
  data: IWhyUs;
  variant: "home" | "about";
}) => {
  const { _id, title, about_outdorr, createdAt, description, updatedAt } = data;
  return (
    <div
      className={cn(
        "container px-6 pb-12 pt-12 lg:px-0 lg:pb-32 lg:pt-24",
        variant === "about" && "md:min-h-[712px] ",
      )}
    >
      <div
        className={cn(
          "h-[inherit] justify-between md:flex md:gap-14 xl:gap-28",
          variant === "home" && "lg:!justify-normal",
          variant === "about" && "md:flex-row-reverse ",
        )}
      >
        <div
          className={cn(
            "relative hidden h-[712px] md:flex",
            variant === "home" &&
              "!hidden justify-center md:w-1/2 lg:!flex lg:w-3/12 xl:w-3/12",
            variant === "about" && "md:w-1/2 lg:w-4/12 xl:w-6/12",
          )}
        >
          {variant === "home" && (
            <Image
              alt="image"
              src={"/images/logom2.svg"}
              className="h-full -rotate-90 opacity-15"
              height={300}
              width={600}
            />
          )}
          {variant === "about" && (
            <div className="relative h-[712px]">
              <Image
                alt="image"
                src={"/images/about-us/parents.jpg"}
                className="h-full w-full rounded-2.5xl object-cover"
                height={1200}
                quality={100}
                width={500}
              />
            </div>
          )}
        </div>
        <div
          className={cn(
            variant === "home" && "md:w-full lg:w-8/12 xl:w-6/12",
            variant === "about" && "md:w-1/2 lg:w-8/12 xl:w-7/12",
          )}
        >
          <Heading title={title} description={description} />
          <WhyItemsContainer variant={variant} data={data} />
        </div>
      </div>
    </div>
  );
};

export default WhyUs;

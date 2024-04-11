import LinkArrow from "@/components/landing/Common/LinkArrow";
import { IHomeAbout } from "@/types/types";

export default function AboutTop({ data }: { data: IHomeAbout }) {
  return (
    <div className="container flex flex-col gap-20 px-6 pt-8 font-sf md:pt-[60px]">
      <div className="flex flex-col gap-6 md:gap-8">
        <p className="text-sm text-darkgray md:text-base">{data.title}</p>
        <h2 className="max-w-[1240px] text-xl leading-[125%] text-darkgray md:mb-2 md:text-3.2xl">
          {data.description}
        </h2>
        <div className="mt-2 flex md:mt-0">
          <LinkArrow to="/about-us" before>
            Learn More
          </LinkArrow>
        </div>
      </div>
    </div>
  );
}

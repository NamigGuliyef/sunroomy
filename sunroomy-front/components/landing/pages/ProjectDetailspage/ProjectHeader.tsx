import { IExtendedProject } from "@/types/types";
import Image from "next/image";

function ProjectHeader({ title, location, tech }: IExtendedProject) {
  return (
    <div className="flex flex-col gap-6 md:gap-0 md:flex-row font-sf text-darkgray">
      <div className="md:w-7/12">
        <h1 className="text-3.2xl font-semibold md:font-normal md:text-7.2xl capitalize">
          {title}
        </h1>
      </div>
      <div className="md:w-5/12">
        <div className="flex flex-col gap-2">
          <div className="rounded-[100px] flex gap-3 font-medium md:font-normal md:gap-6 bg-lightgray w-fit p-3 md:p-4">
            <Image
              src={"/images/projects-page/icon-travel.svg"}
              width={24}
              height={24}
              alt="icon-travel"
            />
            <span className="text-base md:text-2xl lg:text-xl xl:text-2xl text-darkgray">
              {location}
            </span>
          </div>
          <div className="rounded-[100px] flex gap-3 font-medium md:font-normal md:gap-6 bg-lightgray w-fit p-3 md:p-4">
            <Image
              src={"/images/projects-page/icon-home.svg"}
              width={24}
              height={24}
              alt="icon-home"
            />
            <span className="text-base md:text-2xl lg:text-xl xl:text-2xl text-darkgray">
              {tech}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectHeader;

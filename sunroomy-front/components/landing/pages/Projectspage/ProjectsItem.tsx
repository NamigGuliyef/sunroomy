import Button from "@/components/landing/Common/Button";
import { IProject } from "@/types/types";
import Image from "next/image";

interface ProjectsItemProps {
  data: IProject;
  slider?: boolean;
}

const ProjectsItem: React.FC<ProjectsItemProps> = ({ data, slider }) => {
  const { _id, title, location, used_products_joint, photos, type, slug } =
    data;
  return (
    <div
      className={`flex flex-col w-full min-h-full gap-6 lg:justify-between xl:justify-normal lg:min-h-[680px] xl:min-h-[750px] ${
        slider && "xl:min-h-[780px]"
      } `}
    >
      <div className="rounded-2.5xl max-h-[327px] lg:max-h-[100%] lg:h-[400px] group overflow-hidden">
        <Image
          alt="image"
          className="group-hover:scale-[1.1] object-cover object-center min-h-[327px] transition-all duration-500 ease-in-out w-full h-full cursor-pointer"
          src={photos[0]}
          loading="lazy"
          width={424}
          height={400}
        />
      </div>
      <div className="flex lg:min-h-[365px] grow flex-col md:justify-between gap-3 xl:gap-6 lg:p-4 xl:p-6 text-darkgray">
        <h1 className="text-xl md:text-3xl xl:text-3.2xl font-semibold">
          {title}
        </h1>
        <div className="flex flex-col gap-2">
          <div className="rounded-[100px] flex gap-3 font-medium md:font-normal md:gap-6 bg-lightgray w-fit p-4">
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
          <div className="rounded-[100px] flex gap-3 font-medium md:font-normal md:gap-6 bg-lightgray w-fit p-4">
            <Image
              src={"/images/projects-page/icon-home.svg"}
              width={24}
              height={24}
              alt="icon-home"
              priority
            />
            <span className="text-base md:text-2xl lg:text-xl xl:text-2xl text-darkgray">
              {used_products_joint}
            </span>
          </div>
        </div>
        <Button
          to={`/projects/${slug}`}
          className="mt-6 font-sf font-semibold text-lg lg:mt-auto border-2 px-6 py-[18px] max-w-[200px] md:max-w-[300px]"
        >
          Find Out More
        </Button>
      </div>
    </div>
  );
};

export default ProjectsItem;

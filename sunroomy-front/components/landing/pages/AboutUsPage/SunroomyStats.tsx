import { IAboutUs } from "@/types/types";
import Counter from "../../Common/Counter";

const SunroomyStats = ({ data }: { data: IAboutUs }) => {
  return (
    <div className="container px-6 pb-12 pt-8 md:pb-32 md:pt-12 lg:px-0">
      <h1 className="text-center text-3.2xl font-semibold text-darkgray md:text-5xl">
        Sunroomy In Numbers
      </h1>
      <div className="my-12 flex flex-wrap items-center justify-around gap-12 xl:flex-nowrap xl:gap-0 ">
        <div className="flex flex-col gap-4 lg:max-w-[33%]" id="item">
          <div className="text-blue relative rounded-2.5xl bg-white px-24 py-16 text-center">
            <h3 className="text-7.2xl font-bold text-darkgray lg:text-8xl xl:text-9xl">
              <Counter value={data.years_of_experience} direction="up" />
            </h3>
            <div className="absolute right-[22%] top-[22%] mt-2 text-5xl font-bold text-lightblue md:right-[18%] md:top-0 md:text-7.2xl">
              +
            </div>
          </div>
          <h4 className="text-md text-center font-semibold uppercase text-darkgray md:text-2xl">
            Years Of Experience
          </h4>
        </div>
        <div className="flex flex-col gap-4 lg:max-w-[33%]" id="item">
          <div className="text-blue relative rounded-2.5xl bg-white px-24 py-16 text-center">
            <h3 className="text-7.2xl font-bold text-darkgray lg:text-8xl xl:text-9xl">
              <Counter value={data.product_systems} direction="up" />
            </h3>
            <div className="absolute right-[22%] top-[22%] mt-2 text-5xl font-bold text-lightblue md:right-[18%] md:top-0 md:text-7.2xl">
              +
            </div>
          </div>
          <h4 className="text-md text-center font-semibold uppercase text-darkgray md:text-2xl">
            Product Systems
          </h4>
        </div>
        <div className="flex flex-col gap-4 lg:max-w-[33%]" id="item">
          <div className="text-blue relative rounded-2.5xl bg-white px-24 py-16 text-center">
            <h3 className="text-7.2xl font-bold text-darkgray lg:text-8xl xl:text-9xl">
              <Counter value={data.partners} direction="up" />
            </h3>
            <div className="absolute right-[22%] top-[22%] mt-2 text-5xl font-bold text-lightblue md:right-[18%] md:top-0 md:text-7.2xl">
              +
            </div>
          </div>
          <h4 className="text-md text-center font-semibold uppercase text-darkgray md:text-2xl">
            Partners
          </h4>
        </div>
      </div>
    </div>
  );
};

export default SunroomyStats;

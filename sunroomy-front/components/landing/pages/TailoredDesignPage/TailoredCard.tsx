import Image from "next/image";

export interface IDesign {
  step: string;
  title: string;
  description: string;
  photo: string;
}

const TailoredCard: React.FC<{ data: IDesign }> = ({ data }) => {
  return (
    <div
      className="flex flex-col-reverse overflow-hidden rounded-2xl border border-[#bababa] md:flex-row md:even:flex-row-reverse lg:rounded-[30px]"
      id="card"
    >
      <div
        className="flex flex-col justify-between p-6 md:w-1/2 md:p-10 lg:p-[56px]"
        id="card-text"
      >
        <div className="flex flex-col gap-4 !text-darkgray lg:gap-8">
          <h3 className="text-2xl font-semibold md:text-3xl xl:text-3.2xl">
            {data.step}
          </h3>
          <h1 className="text-3.2xl font-semibold capitalize leading-[120%] md:text-4xl xl:text-5xl">
            {data.title}
          </h1>
        </div>
        <p className="lg: mt-8 font-sf text-xl leading-[125%] text-darkgray lg:mt-0 xl:text-2xl">
          {data.description}
        </p>
      </div>
      <div
        className="min-h-[327px] md:min-h-[427px] md:w-1/2 lg:min-h-[647px]"
        id="card-img"
      >
        <Image
          alt="Image"
          quality={100}
          width="660"
          className="h-full min-h-[327px] w-full object-cover "
          height={648}
          src={data.photo}
        />
      </div>
    </div>
  );
};

export default TailoredCard;

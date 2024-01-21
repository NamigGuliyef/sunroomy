import Button from "@/components/landing/Common/Button";
import { IProduct, ISubProduct } from "@/types/types";
import Image from "next/image";

interface SubProductsItemProps {
  data: ISubProduct;
  slider?: boolean;
}

const SubProductsItem: React.FC<SubProductsItemProps> = ({ data, slider }) => {
  const { _id: id, title, cover_photo, description, slug } = data;

  return (
    <div
      className={`flex w-full flex-col ${
        slider ? "" : "md:w-[calc(50%-12px)] min-h-[500px]"
      }  md:min-h-[550px] gap-4 md:justify-between xl:justify-normal`}
    >
      <div className="rounded-2.5xl group">
        <Image
          alt="image"
          className="group-hover:scale-[1.02] min-h-[327px] max-h-[328px] rounded-2.5xl transition-all duration-500 ease-in-out object-cover w-full h-full cursor-pointer"
          src={cover_photo}
          loading="lazy"
          width={424}
          height={327}
        />
      </div>
      <div className="flex font-sf gap-4 text-darkgray md:min-h-[240px] flex-col md:p-6">
        <h1 className="text-xl sm:text-2xl md:text-3.2xl font-semibold mb-1">
          {title}
        </h1>
        <p className="text-base md:text-2xl font-normal md:mb-0 md:mt-2">
          {description}
        </p>
        <Button
          to={`/products/subproducts/${slug}`}
          dark={false}
          className="w-3/4 mt-6 md:mt-auto xl:w-1/2 py-[19px] px-6 font-sf text-lg font-semibold"
        >
          Find Out More
        </Button>
      </div>
    </div>
  );
};

export default SubProductsItem;

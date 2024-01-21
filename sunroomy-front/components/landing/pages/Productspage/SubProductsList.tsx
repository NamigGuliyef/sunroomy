import { ISubProduct } from "@/types/types";
import SubProductsItem from "./SubProductsItem";

export function SubProductsList({ products }: { products: ISubProduct[] }) {
  return (
    <div className="container px-6 lg:px-0 mt-14 flex justify-center flex-wrap gap-6 mb-12 lg:mb-20">
      {products.map((subproduct) => (
        <SubProductsItem key={subproduct._id} data={subproduct} />
      ))}
    </div>
  );
}

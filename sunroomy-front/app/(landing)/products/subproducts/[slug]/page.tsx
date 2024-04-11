import Request from "@/components/landing/Common/Request";
import RequestInfo from "@/components/landing/Common/RequestInfo";
import ScrollDown from "@/components/landing/Common/ScrollDown";
import Section from "@/components/landing/UI/Section";
import ProductCombinations from "@/components/landing/pages/ProductDetailspage/ProductCombinations";
import ProductDetailSlider from "@/components/landing/pages/ProductDetailspage/ProductDetailSlider";
import ProductPlacement from "@/components/landing/pages/ProductDetailspage/ProductPlacement";
import ProductSpecs from "@/components/landing/pages/ProductDetailspage/ProductSpecs";
import ProductsSlider from "@/components/landing/pages/ProductDetailspage/Products";
import { cn } from "@/lib/utils";
import { IExtendedSubproduct, IProduct, ISubProduct } from "@/types/types";
import { Metadata, ResolvingMetadata } from "next";
export const revalidate = 1;
interface ProductDetailsPage {
  product: IProduct;
  products: IProduct[];
}
type SubProductDetailsProps = {
  params: {
    slug: string;
  };
};
export async function generateMetadata(
  { params }: SubProductDetailsProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = params.slug;

  const subproduct = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/subproducts/${slug}`,
    {
      next: { revalidate: 1 },
    },
  ).then((res) => res.json());

  return {
    title: `${subproduct.title}`,
    openGraph: {
      title: `${subproduct.title} | Sunroomy`,
      description: "The Next Generation of Design and Craft.",
    },
    alternates: {
      canonical: `/products/subproducts/${subproduct.slug}`,
    },
  };
}
export async function generateStaticParams() {
  const subproducts = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/subproducts`,
    {
      next: { revalidate: 1 },
    },
  ).then((res) => res.json());

  return subproducts.map((subproduct: ISubProduct) => ({
    slug: subproduct.slug,
  }));
}
async function getSubProductData(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/subproducts/${slug}`,
    {
      next: { revalidate: 1 },
    },
  );
  return res.json();
}
async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/subproducts`,
    {
      next: { revalidate: 1 },
    },
  );
  return res.json();
}

export default async function ProductDetails({
  params,
}: SubProductDetailsProps) {
  const subproduct: IExtendedSubproduct = await getSubProductData(params.slug);
  const {
    title,
    description,
    description_2,
    featuresIds,
    applicationIds,
    customId,
    placementId,
    productId,
  } = subproduct;
  const subproducts: ISubProduct[] = await getData();
  return (
    <Section className="mt-24 lg:mt-[88px]">
      <ProductDetailSlider product={subproduct} />
      <Section className="container grid grid-cols-1 gap-12 px-6 pb-12 pt-8 font-sf !text-darkgray md:grid-cols-6 md:gap-0 lg:grid-cols-12 lg:px-0 lg:pb-24 lg:pt-24">
        <div className="flex flex-col justify-between md:col-span-3 lg:col-span-5">
          <h1 className="text-3.2xl font-semibold md:text-6xl lg:mb-20 lg:text-7.2xl lg:font-normal">
            {title}
          </h1>
        </div>
        <div className="flex flex-col md:col-span-3 md:ml-3 lg:col-span-6 lg:col-start-7 xl:col-start-7">
          <p className="text-xl md:text-justify md:leading-[125%] lg:max-w-[852px] lg:text-2xl">
            {description}
          </p>
        </div>
        <div className="col-span-2">
          <ScrollDown />
        </div>

        <div className="md:col-span-12 md:mt-12">
          <p className="text-darkdray text-xl leading-[125%] md:text-3.2xl ">
            {description_2}
          </p>
        </div>
      </Section>

      <Section className={cn("section", customId && "mb-20")}>
        <RequestInfo styles="px-6 lg:px-0" />
      </Section>
      {customId && (
        <Section className="section bg-[#F5F5F5] py-8 md:py-16">
          <ProductCombinations data={customId} />
        </Section>
      )}
      {placementId && (
        <Section className="section mb-0 py-8 md:py-16">
          <ProductPlacement data={placementId} />
        </Section>
      )}
      {/* <Section className="container my-12 grid grid-cols-1 gap-6 px-6 md:my-20 md:grid-cols-6 lg:grid-cols-12 lg:px-0">
        <div className="font-sf text-darkgray md:col-span-4 lg:col-span-4">
          <h1 className="text-2xl font-semibold sm:text-3.2xl md:mb-8 md:text-5xl">
            Features
          </h1>
          <p className="hidden text-2xl md:block">
            Vel viverra in mi quis. Egestas neque
          </p>
        </div>
        <div
          className={cn(
            "grid gap-6 font-sf md:col-span-6 md:grid-cols-2 md:grid-rows-2 lg:col-span-8",
            featuresIds.length === 1
              ? "md:grid-cols-1 md:grid-rows-1"
              : featuresIds.length === 2
                ? "md:grid-cols-2 md:grid-rows-1"
                : featuresIds.length === 3
                  ? "col-span-2 md:grid-cols-2 md:grid-rows-1"
                  : "md:grid-cols-2 md:grid-rows-2",
          )}
        >
          {featuresIds.map((feature: ISubProductFeature, idx) => (
            <div
              key={idx}
              className="flex gap-4 rounded-2xl border border-[#BABABA] p-8 md:gap-6 md:rounded-[30px]"
            >
              <div className="flex w-3/4 flex-col  gap-6 text-blackgray">
                <h2 className="text-xl font-semibold md:text-2xl">
                  {feature.title}
                </h2>
                <p className="text-sm md:text-base">{feature.description}</p>
              </div>
              <div className="w-1/4">
                <Image
                  src={feature.icon}
                  className="ml-auto"
                  alt=""
                  width={70}
                  height={70}
                />
              </div>
            </div>
          ))}
        </div>
      </Section> */}
      <Section className="mt-14 !font-sf">
        <ProductSpecs product={subproduct} />
      </Section>
      {/* <Section className="!font-sf">
        <ProductApplications applications={applicationIds} />
      </Section> */}
      <Section className=" mt-60px rounded-2xl border border-[#D2D4D4] px-6 py-12 lg:rounded-section lg:p-60px">
        <ProductsSlider products={productId} />
      </Section>

      <Section className="container mb-60px mt-60px flex justify-center px-6 pb-16 lg:px-0">
        <Request size="lg" />
      </Section>
    </Section>
  );
}

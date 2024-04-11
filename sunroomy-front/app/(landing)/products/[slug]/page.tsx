import Request from "@/components/landing/Common/Request";
import RequestInfo from "@/components/landing/Common/RequestInfo";
import Section from "@/components/landing/UI/Section";
import Hero from "@/components/landing/pages/Productspage/Hero";
import { ProductsHeading } from "@/components/landing/pages/Productspage/ProductsHeading";
import { SubProductsList } from "@/components/landing/pages/Productspage/SubProductsList";
import { IProduct, ISubProduct } from "@/types/types";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

type ProductDetailsProps = {
  params: {
    slug: string;
  };
};
export async function generateMetadata(
  { params }: ProductDetailsProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = params.slug;

  const product = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${slug}`,
    {
      next: { revalidate: 1 },
    },
  ).then((res) => res.json());

  return {
    title: `${product.title}`,
    openGraph: {
      title: `${product.title} | Sunroomy`,
      description: "The Next Generation of Design and Craft.",
    },
    alternates: {
      canonical: `/products/${product.slug}`,
    },
  };
}
async function getData(slug: string): Promise<IProduct> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${slug}`,
    {
      next: { revalidate: 1 },
    },
  );
  return res.json();
}

export async function generateStaticParams() {
  const products = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/`,
  ).then((res) => res.json());
  return products.map((product: IProduct) => ({
    slug: product.slug,
  }));
}

export default async function Products({ params }: ProductDetailsProps) {
  const product: IProduct = await getData(params.slug);
  const subproducts: ISubProduct[] = product.subProductIds;
  if (product.statusCode === 404) return notFound();

  const { title, photo, description, subProductIds } = product;
  return (
    <Section className="mt-24 lg:mt-[88px]">
      <Hero photo={photo} />
      <Section className=" relative z-10 -mt-8 rounded-b-2xl rounded-t-2xl bg-white font-sf md:-mt-12 lg:rounded-b-section lg:rounded-t-section">
        <ProductsHeading title={title} description={description} />
        <RequestInfo styles="px-6 lg:px-0 " />
        <SubProductsList products={subproducts} />
        <div className="container flex justify-center px-6 pb-[60px] lg:px-0">
          <Request size="lg" />
        </div>
      </Section>
    </Section>
  );
}

import { PageWrapper } from "@/components/PageWrapper";
import ProductsTable from "@/components/admin/productsTable";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
export const revalidate = 1;
const fetchProducts = async () => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/products",
    );
    return { results: response.data };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export default async function page() {
  const { results: products } = await fetchProducts();
  return (
    <PageWrapper>
      <div className="container mx-auto mt-6 max-w-[1280px] px-6">
        <h1 className="mb-4 text-5xl">Products data</h1>
        <Button
          as={Link}
          href="/admin/dashboard/products/new"
          className="mb-4"
          color="primary"
          size="lg"
        >
          New
        </Button>
        <ProductsTable products={products} />
      </div>
    </PageWrapper>
  );
}

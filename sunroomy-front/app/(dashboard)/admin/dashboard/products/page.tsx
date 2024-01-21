import { PageWrapper } from "@/components/PageWrapper";
import ProductsTable from "@/components/admin/productsTable";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
const fetchProducts = async () => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/products"
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
      <div className="container mt-6 mx-auto px-6 max-w-[1280px]">
        <h1 className="text-5xl mb-4">Products data</h1>
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

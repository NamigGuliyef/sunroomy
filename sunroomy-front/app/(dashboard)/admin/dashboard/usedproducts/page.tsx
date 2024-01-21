import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PageWrapper } from "@/components/PageWrapper";
import UsedProductsTable from "@/components/admin/usedProducts";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { getServerSession } from "next-auth";
import Link from "next/link";
const fetchUserProducts = async (token: any) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/admin/dashboard/usedproducts",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return { results: response.data };
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
};
export default async function page() {
  const session = await getServerSession(authOptions);
  const { results: usedproducts } = await fetchUserProducts(
    session?.user.token
  );
  return (
    <PageWrapper>
      <div className="container mt-6 mx-auto px-6 max-w-[1280px]">
        <h1 className="text-5xl mb-4">Used Products data</h1>
        <Button
          as={Link}
          href="/admin/dashboard/applications/new"
          className="mb-4"
          color="primary"
          size="lg"
        >
          New
        </Button>
        <UsedProductsTable usedProducts={usedproducts} />
      </div>
    </PageWrapper>
  );
}

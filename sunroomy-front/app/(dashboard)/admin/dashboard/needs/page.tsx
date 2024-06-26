import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PageWrapper } from "@/components/PageWrapper";
import NeedsTable from "@/components/admin/needsTable";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { getServerSession } from "next-auth";
import Link from "next/link";
export const revalidate = 1;
const fetchNeeds = async (token: any) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/admin/dashboard/projectneeds",
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );
    return { results: response.data };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export default async function page() {
  const session = await getServerSession(authOptions);
  const { results: needs } = await fetchNeeds(session?.user.token);
  return (
    <PageWrapper>
      <div className="container mx-auto mt-6 max-w-[1280px] px-6">
        <h1 className="mb-4 text-5xl">Needs data</h1>
        <Button
          as={Link}
          href="/admin/dashboard/needs/new"
          className="mb-4"
          color="primary"
          size="lg"
        >
          New
        </Button>
        <NeedsTable needs={needs} />
      </div>
    </PageWrapper>
  );
}

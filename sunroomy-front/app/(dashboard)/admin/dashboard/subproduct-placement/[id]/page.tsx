import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PageWrapper } from "@/components/PageWrapper";
import SubProdPlacementItemTable from "@/components/admin/subProdPlacementTable";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { getServerSession } from "next-auth";
import Link from "next/link";
const fetchPlacement = async (token: any, id: string) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        "/admin/dashboard/subproduct-placement/" + id,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );
    return { results: response.data };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
export default async function page({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const { results: placementItems } = await fetchPlacement(
    session?.user.token,
    params.id,
  );
  console.log(placementItems);

  return (
    <PageWrapper>
      <div className="container mx-auto mt-6 max-w-[1280px] px-6">
        <h1 className="mb-8 text-5xl">{placementItems.title} data for item</h1>
        <Button
          as={Link}
          href={`/admin/dashboard/subproduct-placement/item/${params.id}/new`}
          className="mb-4"
          color="primary"
          size="lg"
        >
          New
        </Button>
        <SubProdPlacementItemTable placements={placementItems} />
      </div>
    </PageWrapper>
  );
}

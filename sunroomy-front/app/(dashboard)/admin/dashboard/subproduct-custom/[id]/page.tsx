import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PageWrapper } from "@/components/PageWrapper";
import SubProdCustomItemTable from "@/components/admin/subProdCustomItemTable";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { getServerSession } from "next-auth";
import Link from "next/link";
const fetchCustom = async (token: any, id: string) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        "/admin/dashboard/subproduct-custom/" + id,
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
  const { results: customItems } = await fetchCustom(
    session?.user.token,
    params.id,
  );
  console.log(customItems);

  return (
    <PageWrapper>
      <div className="container mx-auto mt-6 max-w-[1280px] px-6">
        <h1 className="mb-8 text-5xl">{customItems.title} data for item</h1>
        <Button
          as={Link}
          href={`/admin/dashboard/subproduct-custom/item/${params.id}/new`}
          className="mb-4"
          color="primary"
          size="lg"
        >
          New
        </Button>
        <SubProdCustomItemTable customs={customItems} />
      </div>
    </PageWrapper>
  );
}

import { PageWrapper } from "@/components/PageWrapper";
import ProductsTable from "@/components/admin/productsTable";
import StepsTable from "@/components/admin/views/stepsTable";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
export const revalidate = 1;
const fetchSteps = async () => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/project-design-details",
    );
    return { results: response.data };
  } catch (error) {
    console.error("Error fetching steps:", error);
    throw error;
  }
};
export default async function page() {
  const { results: steps } = await fetchSteps();
  return (
    <PageWrapper>
      <div className="container mx-auto mt-6 max-w-[1280px] px-6">
        <h1 className="mb-4 text-5xl">Tailored Design Steps</h1>
        <Button
          as={Link}
          href="/admin/dashboard/design/new"
          className="mb-4"
          color="primary"
          size="lg"
        >
          New
        </Button>
        <StepsTable steps={steps} />
      </div>
    </PageWrapper>
  );
}

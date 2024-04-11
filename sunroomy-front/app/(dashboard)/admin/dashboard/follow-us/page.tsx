import Loading from "@/app/(dashboard)/loading";
import FollowUsTable from "@/components/admin/followUstable";
import HerosTable from "@/components/admin/herosTable";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { Suspense } from "react";
export const revalidate = 1;
const fetchFollowUs = async () => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/followUs",
    );
    return { results: response.data };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export default async function page() {
  const { results: followUsLinks } = await fetchFollowUs();
  return (
    <Suspense fallback={<Loading />}>
      <div className="container mx-auto mt-6 flex max-w-[1280px] flex-col gap-6 px-6">
        <h1 className="mb-4 text-5xl">Follow us links</h1>

        <div className="flex gap-4">
          <Button
            as={Link}
            href="/admin/dashboard/follow-us/new"
            className="mb-4"
            color="primary"
            size="lg"
          >
            New
          </Button>
        </div>
        <FollowUsTable followUs={followUsLinks} />
      </div>
    </Suspense>
  );
}

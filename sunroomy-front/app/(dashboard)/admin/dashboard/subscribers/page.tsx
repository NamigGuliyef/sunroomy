import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PageWrapper } from "@/components/PageWrapper";
import SubscribersTable from "@/components/admin/subscribersTable";
import { Button } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import Link from "next/link";
export const revalidate = 1;
async function ProjectsTable() {
  const session = await getServerSession(authOptions);

  async function getData() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/dashboard/subscribers`,
      {
        headers: { Authorization: `Bearer ${session?.user.token}` },
        next: { revalidate: 3600 },
      },
    );
    return res.json();
  }
  const results = await getData();
  return (
    <PageWrapper>
      <div className="container mx-auto mt-6 max-w-[1280px] px-6">
        <div className="flex justify-between">
          <h1 className="mb-8 text-4xl">Subscribers</h1>
          <Button as={Link} href="./subscribers/notify">
            Send email to users!
          </Button>
        </div>
        <SubscribersTable results={results} />
      </div>
    </PageWrapper>
  );
}

export default ProjectsTable;

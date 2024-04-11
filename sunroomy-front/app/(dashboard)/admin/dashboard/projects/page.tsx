import Loading from "@/app/(dashboard)/loading";
import { PageWrapper } from "@/components/PageWrapper";
import Helper from "@/components/admin/helper";
import ProductsTable from "@/components/admin/productsTable";
import ProjectsTable from "@/components/admin/projectsTable";
import { Button } from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { Suspense } from "react";
export const revalidate = 1;
const fetchProjects = async () => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/projects",
    );
    return { results: response.data };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export default async function page() {
  const { results: projects } = await fetchProjects();
  return (
    <Suspense fallback={<Loading />}>
      <div className="container mx-auto mt-6 flex max-w-[1280px] flex-col gap-6 px-6">
        <h1 className="mb-4 text-5xl">Projects data</h1>

        <div className="flex gap-4">
          <Button
            as={Link}
            href="/admin/dashboard/projects/new"
            className="mb-4"
            color="primary"
            size="lg"
          >
            New
          </Button>
          <Button
            as={Link}
            href="/admin/dashboard/needs/new"
            className="mb-4"
            color="primary"
            size="lg"
          >
            Create Needs
          </Button>
          <Button
            as={Link}
            href="/admin/dashboard/needs/"
            className="mb-4"
            color="primary"
            size="lg"
          >
            Needs
          </Button>
        </div>
        <ProjectsTable projects={projects} />
        <div className="flex w-full justify-between gap-6">
          <Helper
            cardClass="w-1/3"
            link="/admin/dashboard/needs/new"
            title="Needs"
            text={
              <p>
                After creating project, you should go to{" "}
                <span className="font-medium underline">Create needs page</span>{" "}
                and create it, then you need to come back to this page and add
                it to your project via{" "}
                <span className="font-medium underline">Edit button</span>
              </p>
            }
          />
          <Helper
            cardClass="w-1/3"
            link="/admin/dashboard/usedproducts/new"
            title="Used Product"
            text={
              <p>
                After creating project, you should go to{" "}
                <span className="font-medium underline">
                  Create Used Product page
                </span>{" "}
                and create it, then you need to come back to this page and add
                it to your product via{" "}
                <span className="font-medium underline">Edit button</span>
              </p>
            }
          />
          <Helper
            cardClass="w-1/3"
            link="/admin/dashboard/features/new"
            title="Features"
            text={
              <p>
                After creating project, you should go to{" "}
                <span className="font-medium underline">
                  Create feature page
                </span>{" "}
                and create it, then you need to come back to this page and add
                it to your project via{" "}
                <span className="font-medium underline">Edit button</span>
              </p>
            }
          />
        </div>
      </div>
    </Suspense>
  );
}

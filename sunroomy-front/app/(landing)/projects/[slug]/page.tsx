import Button from "@/components/landing/Common/Button";
import Request from "@/components/landing/Common/Request";
import Section from "@/components/landing/UI/Section";
import ProjectsSlider from "@/components/landing/pages/ProjectDetailspage/Projects";
import ProjectsDetailSlider from "@/components/landing/pages/ProjectDetailspage/ProjectsDetailSlider";
import { IExtendedProject, IProject } from "@/types/types";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-fade";
import { Metadata, ResolvingMetadata } from "next";
import UsedProductsImage from "@/components/landing/pages/ProjectDetailspage/UsedProductsImage";

type ProjectDetailsProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata(
  { params }: ProjectDetailsProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const slug = params.slug;

  const project = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${slug}`,
    {
      next: { revalidate: 1 },
    },
  ).then((res) => res.json());

  return {
    title: `${project.title}`,
    openGraph: {
      title: `${project.title} | Sunroomy`,
      description: "The Next Generation of Design and Craft.",
    },
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
  };
}

export async function generateStaticParams() {
  const projects = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`,
    {
      next: { revalidate: 1 },
    },
  ).then((res) => res.json());

  return projects.map((project: IProject) => ({
    slug: project.slug,
  }));
}
async function getProjectData(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${slug}`,
    {
      next: { revalidate: 1 },
    },
  );
  return res.json();
}
async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`, {
    next: { revalidate: 1 },
  });
  return res.json();
}

async function ProjectDetails({ params }: ProjectDetailsProps) {
  const project: IExtendedProject = await getProjectData(params.slug);
  const projects = await getData();
  const {
    title,
    description,
    used_products_joint,
    location,
    needsId,
    featuresId,
    usedProductsId,
  } = project;
  return (
    <Section className="mt-24 lg:mt-[88px]">
      <Section className="container mt-36 gap-6 px-6 lg:px-0">
        <div className="flex flex-col gap-6 font-sf text-darkgray md:flex-row md:gap-0">
          <div className="md:w-7/12">
            <h1 className="text-3.2xl font-semibold capitalize md:text-7.2xl md:font-normal">
              {title}
            </h1>
          </div>
          <div className="md:w-5/12">
            <div className="flex flex-col gap-2">
              <div className="flex w-fit gap-3 rounded-[100px] bg-lightgray p-3 font-medium md:gap-6 md:p-4 md:font-normal">
                <Image
                  src={"/images/projects-page/icon-travel.svg"}
                  width={24}
                  height={24}
                  alt="icon-travel"
                />
                <span className="text-base text-darkgray md:text-2xl lg:text-xl xl:text-2xl">
                  {location}
                </span>
              </div>
              <div className="flex w-fit gap-3 rounded-[100px] bg-lightgray p-3 font-medium md:gap-6 md:p-4 md:font-normal">
                <Image
                  src={"/images/projects-page/icon-home.svg"}
                  width={24}
                  height={24}
                  alt="icon-home"
                />
                <span className="text-base text-darkgray md:text-2xl lg:text-xl xl:text-2xl">
                  {used_products_joint}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 font-sf text-xl leading-[125%] text-darkgray md:mt-14 md:text-3.2xl">
          {description}
        </div>
      </Section>
      <ProjectsDetailSlider data={project} />
      <Section className="container mt-60px flex flex-col flex-wrap gap-6 px-6 font-sf lg:px-0">
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="flex h-auto flex-col gap-6 rounded-[30px] border border-[#BABABA] p-6 text-darkgray md:w-1/2 lg:min-h-[248px] lg:p-8">
            <h1 className="text-2xl font-semibold text-secondaryblack">
              Project needs
            </h1>
            <p>{needsId?.description}</p>
          </div>
          <div className="flex h-min flex-col gap-6 rounded-[30px] border border-[#BABABA] p-6 text-darkgray md:w-1/2 lg:min-h-[248px] lg:p-8">
            <h1 className="text-2xl font-semibold text-secondaryblack">
              {featuresId[0]?.title}
            </h1>
            <div
              className="flex flex-col gap-4"
              dangerouslySetInnerHTML={{
                __html: featuresId[0]?.description || "",
              }}
            ></div>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="order-2 flex min-h-[540px] flex-col justify-between rounded-[30px] border border-[#BABABA] p-6 text-darkgray md:order-1 md:min-h-[648px] md:w-1/2 lg:p-14">
            <div className="flex flex-col gap-6">
              <p className="text-base font-light ">USED PRODUCTS</p>
              <h1 className="text-3.2xl font-semibold capitalize leading-[120%] text-darkgray lg:text-5xl">
                {usedProductsId?.title} used in this Project
              </h1>
              <p className="text-2xl leading-[120%]">
                {usedProductsId?.description}
              </p>
            </div>
            <Button
              to={"/products/" + usedProductsId?.link}
              className="mt-8 w-9/12 px-6 py-5 font-sf font-semibold md:mt-0 md:w-9/12 lg:w-1/2"
            >
              Find Out More
            </Button>
          </div>
          <UsedProductsImage src={usedProductsId.photos[0]} />
        </div>
      </Section>

      <Section className="mt-60px rounded-2xl border border-[#D2D4D4] px-6 py-12 lg:rounded-section lg:p-60px">
        <ProjectsSlider projects={projects} />
      </Section>

      <Section className="container mb-60px mt-60px flex justify-center px-6 pb-16 lg:px-0">
        <Request size="lg" />
      </Section>
    </Section>
  );
}

export default ProjectDetails;
export const revalidate = 1;

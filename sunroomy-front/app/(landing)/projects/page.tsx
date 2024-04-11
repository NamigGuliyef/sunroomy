export const dynamic = "force-dynamic";
import Request from "@/components/landing/Common/Request";
import Section from "@/components/landing/UI/Section";
import { Hero } from "@/components/landing/pages/Projectspage";
import ProjectsHeading from "@/components/landing/pages/Projectspage/ProjectsHeading";
import ProjectsList from "@/components/landing/pages/Projectspage/ProjectsList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "The Next Generation of Design and Craft",
  openGraph: {
    title: "Projects | Sunroomy",
    description: "The Next Generation of Design and Craft.",
  },
  alternates: {
    canonical: `/projects`,
  },
};

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`, {
    next: { revalidate: 1 },
  });
  return res.json();
}

export default async function Projects() {
  const projects = await getData();
  return (
    <Section className="mt-24 lg:mt-[88px]">
      <Hero />
      <Section className="relative z-10 -mt-8 rounded-t-2xl bg-white font-sf md:-mt-16 lg:rounded-t-section">
        <ProjectsHeading />
        <ProjectsList data={projects} />
      </Section>
      <Section className="flex justify-center rounded-b-2xl bg-white px-6 pb-20 lg:rounded-b-section lg:px-0">
        <div className="container">
          <Request size={"lg"} />
        </div>
      </Section>
    </Section>
  );
}
export const revalidate = 1;
import { PageWrapper } from "@/components/PageWrapper";
import { Metadata } from "next";
import dynamic from "next/dynamic";

// Dynamic imports for components
const Hero = dynamic(() => import("@/components/landing/pages/Homepage/Hero"));
const About = dynamic(
  () => import("@/components/landing/pages/Homepage/About"),
);
const Inspire = dynamic(
  () => import("@/components/landing/pages/Homepage/Inspire"),
);
const Support = dynamic(
  () => import("@/components/landing/pages/Homepage/Support"),
);
const WhyUs = dynamic(
  () => import("@/components/landing/pages/Homepage/WhyUs"),
);
const getWhyUs = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/why-outdorr`,
    {
      next: { revalidate: 1 },
    },
  );
  return res.json();
};

const getInspire = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/letUs-inspire-you`,
    {
      next: { revalidate: 1 },
    },
  );
  return res.json();
};
const getAbout = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/home_about_us`,
    {
      next: { revalidate: 1 },
    },
  );
  return res.json();
};
const getContact = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/contacts`,
    {
      next: { revalidate: 1 },
    },
  );
  return res.json();
};

export default async function Home() {
  try {
    const [whyusData, inspireData, aboutData, contactData] = await Promise.all([
      getWhyUs(),
      getInspire(),
      getAbout(),
      getContact(),
    ]);
    const whyUs = whyusData[0];
    const about = aboutData[0];
    const inspire = inspireData[0];
    const contact = contactData[0];
    return (
      <PageWrapper>
        <Hero />
        <About data={about} />
        <WhyUs variant="home" data={whyUs} />
        <Inspire contact={contact} data={inspire} />
        <Support />
      </PageWrapper>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data</div>;
  }
}

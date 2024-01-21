import { PageWrapper } from "@/components/PageWrapper";
import About from "@/components/landing/pages/Homepage/About";
import Hero from "@/components/landing/pages/Homepage/Hero";
import Inspire from "@/components/landing/pages/Homepage/Inspire";
import Support from "@/components/landing/pages/Homepage/Support";
import WhyUs from "@/components/landing/pages/Homepage/WhyUs";

const getWhyUs = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/why-outdorr`,
    {
      next: { revalidate: 60 },
    },
  );
  return res.json();
};

const getInspire = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/letUs-inspire-you`,
    {
      next: { revalidate: 60 },
    },
  );
  return res.json();
};

export default async function Home() {
  try {
    const [whyusData, inspireData] = await Promise.all([
      getWhyUs(),
      getInspire(),
    ]);
    const whyUs = whyusData[0];
    const inspire = inspireData[0];

    return (
      <PageWrapper>
        <Hero />
        <About />
        <WhyUs variant="home" data={whyUs} />
        <Inspire data={inspire} />
        <Support />
      </PageWrapper>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error fetching data</div>;
  }
}

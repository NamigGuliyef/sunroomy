import RequestInfo from "@/components/landing/Common/RequestInfo";
import { PageWrapper } from "@/components/PageWrapper";
import Section from "@/components/landing/UI/Section";
import Heading from "@/components/landing/pages/TailoredDesignPage/Heading";
import TailoredCard, {
  IDesign,
} from "@/components/landing/pages/TailoredDesignPage/TailoredCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tailored Project Design",
  description: "The Next Generation of Design and Craft",
  openGraph: {
    title: "Tailored Project Design | Sunroomy",
    description: "The Next Generation of Design and Craft.",
  },
};

const getPageData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/project-design`,
    {
      next: { revalidate: 1 },
    },
  );
  return res.json();
};

export default async function page() {
  const data = await getPageData();
  const { title, description, design_details } = data[0];
  return (
    <PageWrapper>
      <Section className="container mt-24 px-6 lg:mt-[88px] lg:px-0">
        <Section className="container pt-20">
          <Heading title={title} description={description} />
          <div
            className="mt-20 flex flex-col gap-12 font-sf text-darkgray lg:gap-20"
            id="cards"
          >
            {design_details.map((design: IDesign, idx: number) => (
              <TailoredCard key={idx} data={design} />
            ))}
          </div>
        </Section>
        <div className="mb-12 mt-12 pb-20 md:mb-20 md:mt-20">
          <RequestInfo />
        </div>
      </Section>
    </PageWrapper>
  );
}
export const revalidate = 1;
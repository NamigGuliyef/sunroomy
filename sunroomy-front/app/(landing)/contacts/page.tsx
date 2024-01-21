import { PageWrapper } from "@/components/PageWrapper";
import Section from "@/components/landing/UI/Section";
import { Contact } from "@/components/landing/pages/Contactspage";
import MapComponent from "@/components/landing/pages/Contactspage/Map";
import { IContacts } from "@/types/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacts",
  description: "The Next Generation of Design and Craft",
};

async function getData(): Promise<IContacts> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contacts`, {
    next: { revalidate: 60 },
  });
  return res.json();
}

export default async function Contacts() {
  const contacts = await getData();
  return (
    <PageWrapper>
      <Section className="mt-24 lg:mt-[88px]">
        <Section className="relative z-10 rounded-b-[16px] rounded-t-[16px] bg-secondarygray py-8 font-sf lg:rounded-b-section lg:rounded-t-section lg:py-20">
          <div className="container mb-10 flex flex-col justify-between gap-12 px-6 text-darkgray lg:mb-12 lg:flex-row lg:gap-0 lg:px-0">
            <Contact conctactsData={contacts[0]} />
            <MapComponent />
          </div>
          {/* <div className="container px-6 lg:px-0">
            <div className="border-t pt-10 lg:pt-12 border-[#1d1d1d] flex flex-col gap-3 mb-4">
              <h1 className="text-3.2xl md:text-5xl font-semibold text-darkgray">
                Have a question?
              </h1>
              <p className="text-2xl text-gray-400">
                We are working 24/7 to help you to get the best out of our
                services
              </p>
            </div>
            <HaveAQuestion />
          </div> */}
        </Section>
      </Section>
    </PageWrapper>
  );
}

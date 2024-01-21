import Preloader from "@/components/landing/Common/Preloader";
import Section from "@/components/landing/UI/Section";
import Hero from "@/components/landing/pages/Requestpage/Hero";
import { Metadata } from "next";
import dynamic from "next/dynamic";
export const metadata: Metadata = {
  title: "Contacts",
  description: "The Next Generation of Design and Craft",
};
const DynamicRequestView = dynamic(
  () => import("@/components/landing/pages/Requestpage/RequestView"),
  {
    loading: () => (
      <div className="min-h-screen">
        <Preloader />
      </div>
    ),
  },
);
export default function Request() {
  return (
    <Section className="mt-24 lg:mt-[88px]">
      <Hero />
      <Section className="relative z-10 -mt-16 rounded-b-2xl rounded-t-2xl bg-[#fff] pb-12 pt-0 font-sf md:py-10 lg:rounded-b-section lg:rounded-t-section lg:py-20">
        <DynamicRequestView />
      </Section>
    </Section>
  );
}

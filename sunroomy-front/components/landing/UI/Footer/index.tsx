import Section from "../Section";
import Contacts from "./Contacts";
import Copyright from "./Copyright";
import FooterTop from "./FooterTop";
import Nav from "./Nav";
import SecondNav from "./SecondNav";

export default function Footer() {
  return (
    <footer>
      <Section className="-mt-16 z-[2] font-sf relative bg-mainblack">
        <div className="container px-6 lg:px-0 pt-16">
          <FooterTop />
          <Nav />
          <SecondNav />
          <Contacts />
          <Copyright />
        </div>
      </Section>
    </footer>
  );
}

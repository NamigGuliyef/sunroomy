import Section from "../../../UI/Section";
import AboutTop from "./AboutTop";
import Collection from "./Collection";

const DATA = [
  {
    id: 1,
    image: "pergola.png",
    text: "pergola",
  },
  {
    id: 2,
    image: "sunroom.png",
    text: "sunroom",
  },
  {
    id: 3,
    image: "louver.png",
    text: "louver",
  },
  {
    id: 4,
    image: "pergola.png",
    text: "pergola",
  },
  {
    id: 5,
    image: "sunroom.png",
    text: "sunroom",
  },
  {
    id: 6,
    image: "louver.png",
    text: "louver",
  },
  {
    id: 7,
    image: "pergola.png",
    text: "pergola",
  },
  {
    id: 8,
    image: "sunroom.png",
    text: "sunroom",
  },
  {
    id: 9,
    image: "louver.png",
    text: "louver",
  },
  {
    id: 10,
    image: "pergola.png",
    text: "pergola",
  },
  {
    id: 11,
    image: "sunroom.png",
    text: "sunroom",
  },
  {
    id: 12,
    image: "louver.png",
    text: "louver",
  },
];

export default function About() {
  return (
    <Section className="-mt-8 rounded-t-2xl bg-secondarygray md:-mt-16 lg:rounded-t-section">
      <AboutTop />
      <Collection containerClass="container px-6 lg:px-0 " data={DATA} />
    </Section>
  );
}

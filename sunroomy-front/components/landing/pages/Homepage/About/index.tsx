import { IHomeAbout, IProduct } from "@/types/types";
import Section from "../../../UI/Section";
import AboutTop from "./AboutTop";
import Collection from "./Collection";
import axios from "axios";

// const DATA = [
//   {
//     id: 1,
//     image: "pergola.png",
//     text: "pergola",
//   },
//   {
//     id: 2,
//     image: "sunroom.png",
//     text: "sunroom",
//   },
//   {
//     id: 3,
//     image: "louver.png",
//     text: "louver",
//   },
//   {
//     id: 4,
//     image: "pergola.png",
//     text: "pergola",
//   },
//   {
//     id: 5,
//     image: "sunroom.png",
//     text: "sunroom",
//   },
//   {
//     id: 6,
//     image: "louver.png",
//     text: "louver",
//   },
//   {
//     id: 7,
//     image: "pergola.png",
//     text: "pergola",
//   },
//   {
//     id: 8,
//     image: "sunroom.png",
//     text: "sunroom",
//   },
//   {
//     id: 9,
//     image: "louver.png",
//     text: "louver",
//   },
//   {
//     id: 10,
//     image: "pergola.png",
//     text: "pergola",
//   },
//   {
//     id: 11,
//     image: "sunroom.png",
//     text: "sunroom",
//   },
//   {
//     id: 12,
//     image: "louver.png",
//     text: "louver",
//   },
// ];

const getData = async (): Promise<IProduct[]> => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`,
  );
  return res.data;
};

export default async function About({ data }: { data: IHomeAbout }) {
  const DATA = await getData();
  return (
    <Section className="relative z-10 -mt-8 rounded-t-2xl bg-secondarygray md:-mt-16 lg:rounded-t-section">
      <AboutTop data={data} />
      <Collection containerClass="container px-6 lg:px-0 " data={DATA} />
    </Section>
  );
}

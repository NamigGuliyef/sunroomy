import Image from "next/image";

export default function Heading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-8 font-sf md:gap-10">
      <h1 className="flex items-center gap-4 fill-darkgray text-3.2xl font-semibold text-darkgray md:text-5xl">
        Why
        <Image
          src={"/images/logoblackblue.svg"}
          alt="sunroomylogo"
          width={200}
          className="mt-[6px]"
          height={48}
        />
      </h1>
      <p
        className="max-w-[495px] text-xl leading-[145%] text-darkgray md:text-2xl"
        dangerouslySetInnerHTML={{ __html: description }}
      ></p>
    </div>
  );
}

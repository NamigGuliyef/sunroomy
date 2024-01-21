import { cn } from "@/lib/utils";

export default function WhyItem({
  text,
  heading,
  variant,
}: {
  text: string;
  variant?: "home" | "about";
  heading: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between gap-4 font-sf md:w-full ",
        variant == "home" && "md:max-w-[310px]",
        variant == "about" && "md:max-w-[290px] xl:max-w-[310px]",
      )}
    >
      <h1 className="font-sf text-2xl font-semibold uppercase text-lightblue">
        {heading.toUpperCase()}
      </h1>
      <p className="font-sf text-base leading-[150%]">{text}</p>
    </div>
  );
}

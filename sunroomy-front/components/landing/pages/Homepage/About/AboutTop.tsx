import LinkArrow from "@/components/landing/Common/LinkArrow";

export default function AboutTop() {
  return (
    <div className="font-sf px-6 container pt-8 md:pt-[60px] flex flex-col gap-20">
      <div className="flex flex-col gap-6 md:gap-8">
        <p className="text-sm md:text-base text-darkgray">
          Sustainable Outdoor Living Structures I Custom Pergolas, Sunrooms,
          Louvers & ADU Modules
        </p>
        <h2 className="max-w-[1240px] leading-[125%] text-xl md:text-3.2xl text-darkgray md:mb-2">
          Ante quis sed nibh cras. Ornare ullamcorper libero at elementum enim
          morbi pulvinar. Ac hendrerit nisl rhoncus nisl tempus. Ante quis sed
          nibh cras. Ornare ullamcorper libero at elementum enim morbi pulvinar.
          Ac hendrerit nisl rhoncus nisl tempus.
        </h2>
        <div className="flex mt-2 md:mt-0">
          <LinkArrow to="/products" before>
            Learn More
          </LinkArrow>
        </div>
      </div>
    </div>
  );
}

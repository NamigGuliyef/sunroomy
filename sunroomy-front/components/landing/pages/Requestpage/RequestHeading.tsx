export default function RequestHeading() {
  return (
    <div className="container px-6 lg:px-0 flex flex-col lg:flex-row gap-6 pt-8 lg:pt-24 pb-12 lg:pb-24 !text-darkgray">
      <div className="w-full lg:w-1/2 flex flex-col justify-between">
        <h1 className="text-3.2xl md:text-6xl lg:text-7.2xl lg:mb-36 font-semibold lg:font-normal">
          Request a Project
        </h1>
      </div>
      <div className="w-full lg:w-1/2 flex flex-col">
        <p className="text-xl lg:text-2xl lg:max-w-[531px] leading-[125%]">
          Ante quis sed nibh cras. Ornare ullamcorper libero at elementum enim
          morbi pulvinar. Ac hendrerit nisl rhoncus nisl tempus. Ante quis sed
          nibh cras. Ornare ullamcorper libero at elementum enim morbi pulvinar.
          Ac hendrerit nisl.
        </p>
      </div>
    </div>
  );
}

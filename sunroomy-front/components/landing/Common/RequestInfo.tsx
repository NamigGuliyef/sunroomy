import Button from "./Button";

export default function RequestInfo({ styles }: { styles?: string }) {
  return (
    <div
      className={`container overflow-hidden ${styles} !text-secondaryblack font-sf `}
    >
      <div className="lg:py-12 xl:py-20 p-5 xl:px-[120px] lg:px-[96px] flex flex-col gap-3 md:flex-row justify-between rounded-2xl lg:rounded-[30px] bg-secondarygray items-start md:gap-6">
        <div className="md:w-5/12">
          <h1 className="text-2xl sm:text-3.2xl lg:text-5xl font-semibold leading-[120%] min-w-[222px] pr-6 sm:pr-0">
            Request information or a quote
          </h1>
        </div>
        <div className="md:w-6/12 flex flex-col">
          <p className="text-base max-w-[528px] leading-[150%]">
            Venenatis neque odio tempor proin ultrices arcu turpis amet iaculis.
            Cursus maecenas tristique eget duis elit lectus turpis leo molestie.
            Cras quis libero porttitor faucibus. Scelerisque nec mattis.
          </p>
          <Button
            to="#"
            dark
            className="w-full sm:w-7/12 px-6 text-lg mt-12 font-helvetica py-[18px]"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
}

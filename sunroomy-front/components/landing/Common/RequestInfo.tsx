import Button from "./Button";

export default function RequestInfo({ styles }: { styles?: string }) {
  return (
    <div
      className={`container overflow-hidden ${styles} font-sf !text-secondaryblack `}
    >
      <div className="flex flex-col items-start justify-between gap-3 rounded-2xl bg-secondarygray p-5 md:flex-row md:gap-6 lg:rounded-[30px] lg:px-[96px] lg:py-12 xl:px-[120px] xl:py-20">
        <div className="md:w-5/12">
          <h1 className="min-w-[222px] pr-6 text-2xl font-semibold leading-[120%] sm:pr-0 sm:text-3.2xl lg:text-5xl">
            Discover pricing options
          </h1>
        </div>
        <div className="flex flex-col md:w-6/12">
          <p className="max-w-[528px] text-lg leading-[150%]">
            Enlarge your living space. Get a custom quote for Sliding Doors,
            Folding Doors, Swing Doors, Bifold Doors and Windows.
          </p>
          <Button
            to="/request-a-quote"
            dark
            className="mt-12 w-full px-6 py-[18px] font-helvetica text-lg sm:w-7/12"
          >
            Request a Quote
          </Button>
        </div>
      </div>
    </div>
  );
}

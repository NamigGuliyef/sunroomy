"use client";
const MapComponent = () => {
  return (
    <div className="w-full lg:w-6/12" style={{ filter: "grayscale(75%)" }}>
      <iframe
        loading="lazy"
        src="https://maps.google.com/maps?q=37.380723,-121.941023&hl=en;z=2&amp;output=embed        "
        className="h-[327px] w-full overflow-hidden rounded-[16px] border-2 border-black lg:h-[648px] lg:rounded-[30px] xl:w-[648px]"
      ></iframe>
    </div>
  );
};

export default MapComponent;

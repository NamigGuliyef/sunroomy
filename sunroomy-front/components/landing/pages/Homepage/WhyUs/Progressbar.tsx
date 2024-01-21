import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface ProgressBarProps {
  totalSlides: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalSlides }) => {
  const [progress, setProgress] = useState(0);

  const handleSlideChange = (swiper: any) => {
    const currentProgress = (swiper.realIndex / (totalSlides - 1)) * 100;
    setProgress(currentProgress);
  };

  useEffect(() => {
    const swiperInstance = (document.querySelector(".swiper-container") as any)
      .swiper;
    swiperInstance.on("slideChange", handleSlideChange);

    return () => {
      swiperInstance.off("slideChange", handleSlideChange);
    };
  }, [totalSlides]);

  return (
    <div className="relative h-1 w-full bg-gray-300">
      <div
        className="absolute top-0 left-0 h-full bg-blue-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;

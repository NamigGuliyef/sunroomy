import { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface ProgressBarProps {
  totalSlides: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalSlides }) => {
  const [progress, setProgress] = useState(0);

  const handleSlideChange = useCallback(
    (swiper: any) => {
      const currentProgress = (swiper.realIndex / (totalSlides - 1)) * 100;
      setProgress(currentProgress);
    },
    [totalSlides],
  );

  useEffect(() => {
    const swiperInstance = (document.querySelector(".swiper-container") as any)
      .swiper;
    swiperInstance.on("slideChange", handleSlideChange);

    return () => {
      swiperInstance.off("slideChange", handleSlideChange);
    };
  }, [totalSlides, handleSlideChange]);

  return (
    <div className="relative h-1 w-full bg-gray-300">
      <div
        className="absolute left-0 top-0 h-full bg-blue-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;

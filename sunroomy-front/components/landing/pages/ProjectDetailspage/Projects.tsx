"use client";
import { IProject } from "@/types/types";
import { useRef, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import ProjectsItem from "../Projectspage/ProjectsItem";
import { ProjectsNav } from "./ProjectsNav";

export interface ProjectsSliderProps {
  projects: IProject[];
}

const ProjectsSlider: React.FC<ProjectsSliderProps> = ({ projects }) => {
  const [_, setInit] = useState<boolean>();
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const swiper = useSwiper();
  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  return (
    <div className="font-sf font-semibold">
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-between text-darkgray">
          <h1 className="text-3.2xl md:text-5xl">Meet our collection</h1>
          <div className="hidden gap-1 text-5xl md:flex">
            <div
              className={isFirstSlide ? "cursor-default" : "cursor-pointer"}
              ref={prevButtonRef}
            >
              <ProjectsNav rotate={true} isFirst={isFirstSlide} />
            </div>
            <div
              className={isLastSlide ? "cursor-default" : "cursor-pointer"}
              ref={nextButtonRef}
            >
              <ProjectsNav isLast={isLastSlide} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 24,
            },
            576: {
              slidesPerView: 1.5,
              spaceBetween: 24,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            992: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1320: {
              slidesPerView: 2.5,
              spaceBetween: 24,
            },
            1440: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          speed={700}
          onInit={() => setInit(true)}
          onSlideChange={({ isBeginning, isEnd }) => {
            setIsFirstSlide(isBeginning);
            setIsLastSlide(isEnd);
          }}
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: prevButtonRef.current,
            nextEl: nextButtonRef.current,
          }}
        >
          {projects.map((item: any) => (
            <SwiperSlide key={item._id}>
              <ProjectsItem slider data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProjectsSlider;

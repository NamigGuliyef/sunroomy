"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectsItem from "./ProjectsItem";
import { useRouter, useSearchParams } from "next/navigation";
import { IProject } from "@/types/types";

const ProjectsList: React.FC<{ data: IProject[] }> = ({ data }) => {
  const query = useSearchParams();
  const type = query.get("type");
  const [filteredData, setFilteredData] = useState<IProject[]>(data);

  useEffect(() => {
    if (type && type != "all") {
      const lowerCaseType = type.toLowerCase();
      const filteredProjects = data.filter(
        (project) => project.type.toLowerCase() === lowerCaseType,
      );
      setFilteredData(filteredProjects);
    } else {
      setFilteredData(data);
    }
  }, [data, type]);

  return (
    <div className="container mb-12 mt-12 flex flex-wrap justify-center gap-6 px-6 lg:mb-20 lg:mt-0 lg:px-0">
      <AnimatePresence>
        {filteredData.map((project, idx) => (
          <motion.div
            key={idx}
            className="w-full md:w-[calc(50%-12px)] xl:w-[calc(33.3%-16px)]"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 10 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <ProjectsItem data={project} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsList;

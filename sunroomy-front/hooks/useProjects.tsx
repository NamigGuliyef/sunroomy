import { create } from "zustand";

type ProjectsState = {
  active: string;
  setActive: (active: string) => void;
};

const useProjects = create<ProjectsState>((set) => ({
  active: "home",
  setActive: (active) => set({ active }),
}));

export default useProjects;

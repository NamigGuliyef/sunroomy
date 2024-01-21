import { create } from "zustand";

type NavState = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const useNav = create<NavState>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));

export default useNav;

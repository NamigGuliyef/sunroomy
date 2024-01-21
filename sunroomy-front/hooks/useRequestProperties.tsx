import { create } from "zustand";

interface RequestProperties {
  width: number | string;
  height: number | string;
  projection: number | string;
  setWidth: (width: number | string) => void;
  setHeight: (height: number | string) => void;
  setProjection: (projection: number | string) => void;
}

const useRequestProperties = create<RequestProperties>((set) => ({
  width: 0,
  height: 0,
  projection: 0,
  setWidth: (width) => set({ width }),
  setHeight: (height) => set({ height }),
  setProjection: (projection) => set({ projection }),
}));

export default useRequestProperties;

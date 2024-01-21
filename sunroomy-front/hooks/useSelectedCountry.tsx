import { create } from "zustand";

interface CountryStoreState {
  selectedCountry: Object | null;
  setSelectedCountry: (country: string | null) => void;
}

const useCountryStore = create<CountryStoreState>((set) => ({
  selectedCountry: null,
  setSelectedCountry: (country) => set({ selectedCountry: country }),
}));

export default useCountryStore;

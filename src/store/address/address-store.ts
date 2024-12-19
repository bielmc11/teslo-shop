import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  //OJO Aqui puede que haya un error con el nombre de los campos - la interfaz en el form es distinta - y en BD
  address: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
  };
  setAddress: (address: State["address"]) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        postalCode: "",
        city: "",
        country: "",
        phone: "",
      },
      setAddress: (address: State["address"]) => set({ address }),
    }),
    { name: "address-storage" }
  )
);

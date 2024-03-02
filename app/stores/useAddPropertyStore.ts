import { create } from "zustand";

interface Store {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddPropertyStore = create<Store>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true });
  },
  onClose: () => {
    set({ isOpen: false });
  },
}));

export default useAddPropertyStore;

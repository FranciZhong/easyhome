import { create } from "zustand";

interface Store {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useFilterModalStore = create<Store>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true });
  },
  onClose: () => {
    set({ isOpen: false });
  },
}));

export default useFilterModalStore;

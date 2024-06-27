import { create } from "zustand";
export const WALLET_NAME_KEY = "WALLET_NAME_KEY";
interface ModalStore {
  showConnectModal: boolean;

  toggleConnectModal: (open: boolean) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  showConnectModal: false,
  toggleConnectModal(open) {
    set({
      showConnectModal: open,
    });
  },
}));

import { create } from "zustand";

interface AppStore {
    showConnectModal: boolean;
    toggleConnectModal: (open: boolean) => void;

    loading: boolean;
    setLoading: (loading: boolean) => void; 
    walletConnected: boolean;
    setWalletConnected: (loading: boolean) => void; 
}

export const useAppStore = create<AppStore>()((set) => ({
    showConnectModal: false,
    loading: false, 
    walletConnected: false, 
    toggleConnectModal(open) {
        set({ showConnectModal: open });
    },
    setLoading(loading) {
        set({ loading });
    },
    setWalletConnected(walletConnected) {
        set({ walletConnected });
    },
}));
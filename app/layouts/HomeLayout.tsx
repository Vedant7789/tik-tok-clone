import React, { useEffect } from "react";
import SideNavMain from "./includes/SideNavMain";
import TopNav from "./includes/TopNav";
import { usePathname } from "next/navigation";
import { useWallet } from "@meshsdk/react";
import { useAppStore } from "../stores";
import { success } from "../utils/toast";
import { ConnectModal } from "../components/ConnectWallet";
import Loader from "../components/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const { showConnectModal, setLoading, setWalletConnected, walletConnected, loading } =
        useAppStore();
    const { connect } = useWallet();

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const walletName = localStorage.getItem("wallet_name" ?? "");
                if (walletName) {
                    setWalletConnected(true);
                    connect(walletName);
                    success(`Connected wallet to ${walletName}!`);
                }
            } catch (error) {
                console.error("Error in connecting wallet:", error);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, [walletConnected]);

    return loading ? <Loader /> : (
        <>
            <TopNav />
            <div className={`flex md:gap-6 w-full items-start relative z-[1]`}>
                <SideNavMain />
                {children}
                {showConnectModal && <ConnectModal />}
            </div>
            <ToastContainer position="top-center" theme="dark" style={{ minWidth: "400px" }} />
        </>
    );
}

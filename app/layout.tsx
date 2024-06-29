"use client"
import UserProvider from "./context/user";
import AllOverlays from "@/app/components/AllOverlays";
import "@/app/styles/globals.css";
import type { Metadata } from "next";
import { ConnectModal } from "@/app/components/ConnectModal";
import { useModalStore } from "@/app/stores/modal";
import { useEffect } from "react";
import { useAppStore } from "./stores";
import { MeshProvider, useWallet } from "@meshsdk/react";

import "react-toastify/dist/ReactToastify.css";
import { success } from "./utils/toast";
import { ToastContainer } from "react-toastify";

const metadata: Metadata = {
    title: "TikTok Clone",
    description: "TikTok Clone",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { showConnectModal, setLoading, setWalletConnected, walletConnected } = useAppStore();
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
                console.error('Error in connecting wallet:', error);
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, [walletConnected]);

    return (
        <html lang="en">
            <MeshProvider>
                <UserProvider>
                    <body className="p-[4%]">
                        <AllOverlays />
                        {children}
                        <ToastContainer position="top-center" theme="dark" style={{ minWidth: "400px" }} />
                        {showConnectModal && <ConnectModal />}
                    </body>
                </UserProvider>
            </MeshProvider>
        </html>
    );
}

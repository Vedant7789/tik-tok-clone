import React, { useEffect } from "react";
import SideNavMain from "./includes/SideNavMain";
import TopNav from "./includes/TopNav";
import { usePathname } from "next/navigation";
import { useWallet } from "@meshsdk/react";
import { useAppStore } from "../stores";
import { success } from "../utils/toast";
import { ConnectModal } from "../components/ConnectWallet";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const { showConnectModal, loading } = useAppStore();

    return loading ? <>Loading...</> : (
        <>
            <TopNav />
            <div className={`flex md:gap-6 w-full items-start relative mt-12 z-[1]`}>
                <SideNavMain />
                {children}
                {showConnectModal && <ConnectModal />}
            </div>
        </>
    );
}

import React from "react"
import TopNav from "./includes/TopNav"
import { ConnectModal } from "../components/ConnectWallet"
import { useAppStore } from "../stores";
import Loader from "../components/Loader";

export default function UploadLayout({ children }: { children: React.ReactNode }) {
    const { showConnectModal, loading } = useAppStore();

    return loading ? <Loader /> : (
      	<>
			<div className="w-full rounded-xl my-[5%] md:my-0">
                <TopNav/>
                <div className="flex justify-between mx-auto w-full px-2 max-w-[1140px]">
                    {children}
                    {showConnectModal && <ConnectModal />}
                </div>
            </div>
      	</>
    )
}
  
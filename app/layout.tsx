"use client"
import UserProvider from "./context/user";
import AllOverlays from "@/app/components/AllOverlays";
import "@/app/styles/globals.css";
import type { Metadata } from "next";
import { ConnectModal } from "@/app/components/ConnectModal";
import { useModalStore } from "@/app/stores/modal";

export const metadata: Metadata = {
  title: "TikTok Clone",
  description: "TikTok Clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
})
{
  const { toggleConnectModal, showConnectModal } = useModalStore();
  return (
      <html lang="en">
        <UserProvider>
          <body className="p-[4%]">
            <AllOverlays />
            {children}
            {/* {showConnectModal && <ConnectModal />} */}
          </body>
        </UserProvider>
      </html>
  );
}

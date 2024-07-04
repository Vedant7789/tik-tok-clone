"use client"
import UserProvider from "./context/user";
import AllOverlays from "@/app/components/AllOverlays";
import "@/app/styles/globals.css";
import type { Metadata } from "next";
import { useModalStore } from "@/app/stores/modal";
import { useEffect } from "react";
import { useAppStore } from "./stores";
import { MeshProvider, useWallet } from "@meshsdk/react";

import { ModalContextProvider } from "./context/ModalContext";

const metadata: Metadata = {
    title: "TikTok Clone",
    description: "TikTok Clone",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <html lang="en">
            <MeshProvider>
                <UserProvider>
                    <ModalContextProvider>
                        <body className="py-0 px-[4%] md:p-[4%]">
                            <AllOverlays />
                            {children}
                        </body>
                    </ModalContextProvider>
                </UserProvider>
            </MeshProvider>
        </html>
    );
}

import axios from 'axios';
import { useAddress, useWallet, useWalletList } from "@meshsdk/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { wallets } from "../constants/data";
import { useAppStore } from '../stores';

export const ConnectModal = () => {

    const { toggleConnectModal, setWalletConnected } = useAppStore();

    const modalRef = useRef<HTMLDivElement>(null);

    const { connect } = useWallet();
    const wallets = useWalletList();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                modalRef.current &&
                event.target &&
                !modalRef.current.contains(event.target as Node)
            ) {
                toggleConnectModal(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalRef]);


    const handleConnect = async (n: string) => {
        connect(n);
        toggleConnectModal(false);

        localStorage.setItem('wallet_name', n)
        setWalletConnected(true);
    };

    return (
        <div className="bg-transparent w-full h-screen fixed left-0 top-0 z-50 flex justify-center items-center backdrop-blur-lg">
            <div
                ref={modalRef}
                className="w-[90vw] max-w-[400px] lg:w-[400px] lg:m-auto h-auto bg-[#222323] mt-2 rounded-lg text-white p-2"
            >
                {/* Title */}
                <div className="text-xl text-center font-bold pb-5 pt-4">
                    Connect Your Wallet
                </div>

                {/* wallet cards */}
                <div className="h-full overflow-y-scroll max-h-[500px]">
                    <div className="p-5 flex flex-col gap-5">
                        {/* card */}
                        {wallets ? (
                            wallets.map((w, id) => (
                                <div
                                    key={id * Math.random()}
                                    onClick={() => handleConnect(w.name)}
                                    className="h-[60px] p-5 hover:scale-[1.02] w-full flex justify-between items-center rounded-lg cursor-pointer transition-all bg-black/25"
                                >
                                    {/* Name */}
                                    <div className="text-sm lg:text-xl">{w.name}</div>
                                    {/* Image */}
                                    <Image
                                        width={1000}
                                        height={1000}
                                        className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px]  object-contain"
                                        src={w.icon}
                                        alt={w.icon}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="text-center">No Wallet Found</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
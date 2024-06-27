"use client";
import { useWallet, useWalletList } from "@meshsdk/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { wallets } from "@/app/data/wallet";
import { BrowserWallet } from "@meshsdk/core";
import { WALLET_NAME_KEY, useModalStore } from "../stores/modal";

export const ConnectModal = () => {
  const { toggleConnectModal, showConnectModal } = useModalStore();

  const modalRef = useRef<HTMLDivElement>(null);

  const supportedWallets = useWalletList();

  const { connect } = useWallet();

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

  return (
    <div className="w-full h-screen fixed left-0 top-0 z-[999] flex justify-center items-center bg-[#000]/60 backdrop-blur-lg">
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
            {supportedWallets.length > 0 ? (
              supportedWallets.map((w, id) => (
                <div
                  key={id * Math.random()}
                  onClick={async () => {
                    await connect(w.name);
                    toggleConnectModal(false);
                    const wallet = await BrowserWallet.enable(w.name);
                    const address = (await wallet.getRewardAddresses())[0];

                    localStorage.setItem(WALLET_NAME_KEY, w.name);
                  }}
                  className="h-[60px] px-5 py-2 hover:scale-[1.02] w-full flex justify-between items-center rounded-lg cursor-pointer transition-all"
                  style={{
                    background: wallets[w.name.toLowerCase()]?.gradient_bg,
                  }}
                >
                  {/* Name */}
                  <div className="text-sm lg:text-xl capitalize">{w.name}</div>
                  {/* Image */}
                  <Image
                    width={40}
                    height={40}
                    className="w-[30px] h-[30px] lg:w-[50px] lg:h-[50px]  object-contain"
                    src={wallets[w.name.toLowerCase()]?.image ?? ""}
                    alt={wallets[w.name.toLowerCase()]?.title ?? ""}
                  />
                </div>
              ))
            ) : (
              <div className="text-center font-light">No Wallet Found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

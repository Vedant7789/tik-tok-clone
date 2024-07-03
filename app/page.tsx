"use client"

import { useEffect } from "react"
import MainLayout from "./layouts/MainLayout"
import { usePostStore } from "@/app/stores/post"
import ClientOnly from "./components/ClientOnly"
import PostMain from "./components/PostMain"
import HomeLayout from "./layouts/HomeLayout"
import Loader from "./components/Loader"
import { useModalContext } from "./context/ModalContext"

export default function Home() {
    let { allPosts, setAllPosts, loading } = usePostStore();
    const { isModalVisible, setIsModalVisible } = useModalContext();
    useEffect(() => { setAllPosts() }, [])
    const handleModalClose = () => {
        setIsModalVisible(false);
    };
    return (
        <>
            <meta name="description" content={"99pitch"} />
            {/* <link rel="icon" href="" /> */}

            {/* <meta property="og:url" content="" /> */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={"99pitch"} />
            <meta property="og:description" content={"99pitch"} />
            {/* <meta property="og:image" content={""} /> */}

            {/* <meta name="twitter:card" content={""} /> */}
            {/* <meta property="twitter:domain" content="" /> */}
            {/* <meta property="twitter:url" content="" /> */}
            <meta name="twitter:title" content={"99pitch"} />
            <meta name="twitter:description" content={"99pitch"} />
            <HomeLayout>
                {
                    loading ?
                        <Loader /> :
                        <div className="relative w-auto h-full rounded-xl flex-1 sm:px-12 flex flex-col max-w-[100vw] -translate-x-[4%] md:translate-x-0">
                            <ClientOnly>
                                <div className="overflow-x-hidden max-h-full scroll_snapping">
                                    {allPosts.map((post, index) => (
                                        <>
                                            <PostMain isAutoplayEnabled={!isModalVisible} post={post} key={index} />
                                        </>
                                    ))}
                                </div>
                            </ClientOnly>
                        </div>
                }
            </HomeLayout>
            <Modal isVisible={isModalVisible} onClose={handleModalClose} />
        </>
    )
}


function Modal({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black bg-opacity-50 flex justify-center items-center">
            <div className="flex justify-center flex-col bg-[#121316] py-12 px-12 rounded-lg shadow-lg w-full max-w-[480px] h-fit mx-4">
                <h2 className="text-3xl mb-4 font-offbit-101-bold">Hey, Thanks for testing out!</h2>
                <p className="text-lg mb-4 font-neue-regular">Please give us feedback. Press continue to play.</p>
                <button
                    onClick={onClose}
                    className="self-end rounded text-[15px] px-3 sm:px-[21px] py-0.5 bg2 text-[#ffeef2] hover:bg-[#F02C56]/50 font-semibold font-offbit-101-bold tracking-widest leading-[1] pt-3 pb-2 flex items-center gap-1 transition-all duration-300 backdrop-blur"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

"use client"

import { useEffect } from "react"
import MainLayout from "./layouts/MainLayout"
import { usePostStore } from "@/app/stores/post"
import ClientOnly from "./components/ClientOnly"
import PostMain from "./components/PostMain"
import HomeLayout from "./layouts/HomeLayout"
import Loader from "./components/Loader"

export default function Home() {
    let { allPosts, setAllPosts, loading } = usePostStore();
    useEffect(() => { setAllPosts() }, [])
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
                                    <PostMain post={post} key={index} />
                                ))}
                            </div>
                        </ClientOnly>
                    </div>
                }
            </HomeLayout>
        </>
    )
}


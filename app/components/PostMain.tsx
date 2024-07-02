"use client"

import { AiFillHeart } from "react-icons/ai"
import { ImMusic } from "react-icons/im"
import Link from "next/link"
import { useEffect } from "react"
import PostMainLikes from "./PostMainLikes"
import useCreateBucketUrl from "../hooks/useCreateBucketUrl"
import { PostMainCompTypes } from "../types"
import { MdWhereToVote } from "react-icons/md"
import { BsTwitter } from "react-icons/bs"

export default function PostMain({ post }: PostMainCompTypes) {

    useEffect(() => {
        const video = document.getElementById(`video-${post?.id}`) as HTMLVideoElement
        const postMainElement = document.getElementById(`PostMain-${post.id}`);

        if (postMainElement) {
            let observer = new IntersectionObserver((entries) => {
                entries[0].isIntersecting ? video.play() : video.pause()
            }, { threshold: [0.6] });

            observer.observe(postMainElement);
        }
    }, [])

    const openLink = (url: string | null) => url && window.open(url, "_blank");

    return (
        <div className="relative snap_childrens h-[100dvh] md:h-full">
            <div className="block md:hidden">
                <div id={`PostMain-${post.id}`} className="flex border-b h-[100vh] md:h-full w-[100vw]">
                    <video
                        id={`video-${post.id}`}
                        loop
                        // controls
                        muted
                        className="object-cover h-full w-full aspect-auto"
                        src={useCreateBucketUrl(post?.video_url)}
                    />

                    <div className="absolute bottom-7 left-5 right-5 ">
                        <div className="flex items-center justify-between pb-0.5">
                            <div className="flex items-center gap-2">
                                <div className="cursor-pointer">
                                    <img className="rounded-full max-h-[60px]" width="60" src={useCreateBucketUrl(post?.profile?.image)} />
                                </div>
                                <Link href={`/profile/${post.profile.user_id}`}>
                                    <span className="font-bold hover:underline cursor-pointer">
                                        {post.profile.name}
                                    </span>
                                </Link>
                            </div>
                            <div className="flex gap-4 items-center">
                                {
                                    post.proposal_link && 
                                        <button onClick={() => openLink(post.proposal_link)} className="rounded text-[15px] px-3 sm:px-[21px] py-0.5 bg2 text-[#ffeef2] hover:bg-[#F02C56]/50 font-semibold font-offbit-101-bold tracking-widest leading-[1] pt-3 pb-2 flex items-center gap-1 transition-all duration-300 backdrop-blur">
                                            <MdWhereToVote className="-translate-y-[3px]" />
                                            <span className="hidden sm:inline-block">Proposal</span>
                                        </button>
                                }
                                {
                                    post.twitter_link &&
                                        <button onClick={() => openLink(post.twitter_link)} className="rounded text-[15px] px-3 sm:px-[21px] py-0.5 bg2 text-[#ffeef2] hover:bg-[#F02C56]/50 font-semibold font-offbit-101-bold tracking-widest leading-[1] pt-3 pb-2 flex items-center gap-1 transition-all duration-300 backdrop-blur">
                                            <BsTwitter className="-translate-y-[3px]" />
                                            <span className="hidden sm:inline-block">Profile</span>
                                        </button>
                                }
                            </div>

                        </div>

                    </div>

                    <div className="absolute right-1 bottom-20">
                        <PostMainLikes post={post} />
                    </div>
                </div>
            </div>
            <div className="hidden  md:block">
                <div id={`PostMain-${post.id}`} className="flex border-b py-6">
                    <div className="pl-3 w-full px-4 font-neue-regular ">

                        {/* name and buttons */}
                        <div className="flex items-center justify-between pb-0.5">
                            <div className="flex items-center gap-2">
                                <div className="cursor-pointer">
                                    <img className="rounded-full max-h-[60px]" width="60" src={useCreateBucketUrl(post?.profile?.image)} />
                                </div>
                                <Link href={`/profile/${post.profile.user_id}`}>
                                    <span className="font-bold hover:underline cursor-pointer">
                                        {post.profile.name}
                                    </span>
                                </Link>
                            </div>
                            <div className="flex gap-4 items-center">
                                {
                                    post.proposal_link && 
                                        <button onClick={() => openLink(post.proposal_link)} className="rounded text-[15px] px-3 sm:px-[21px] py-0.5 bg2 text-[#ffeef2] hover:bg-[#F02C56]/50 font-semibold font-offbit-101-bold tracking-widest leading-[1] pt-3 pb-2 flex items-center gap-1 transition-all duration-300">
                                            <MdWhereToVote className="-translate-y-[3px]" />
                                            <span className="hidden sm:inline-block">Proposal</span>
                                        </button>
                                }
                                {
                                    post.twitter_link && 
                                        <button onClick={() => openLink(post.twitter_link)} className="rounded text-[15px] px-3 sm:px-[21px] py-0.5 bg2 text-[#ffeef2] hover:bg-[#F02C56]/50 font-semibold font-offbit-101-bold tracking-widest leading-[1] pt-3 pb-2 flex items-center gap-1 transition-all duration-300">
                                            <BsTwitter className="-translate-y-[3px]" />
                                            <span className="hidden sm:inline-block">Profile</span>
                                        </button>
                                }
                            </div>

                        </div>


                        <div className="mt-2.5 relative justify-center flex">
                            <div
                                className="relative aspect-[260/480] w-full min-w-[300px] max-w-[450px] flex items-center bg-black rounded-xl cursor-pointer"
                            >
                                <video
                                    id={`video-${post.id}`}
                                    loop
                                    controls
                                    muted
                                    className="rounded-xl object-cover mx-auto h-full"
                                    src={useCreateBucketUrl(post?.video_url)}
                                />
                                <PostMainLikes post={post} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


// export default function PostMain({ post }: PostMainCompTypes) {

//     useEffect(() => {
//         const video = document.getElementById(`video-${post?.id}`) as HTMLVideoElement
//         const postMainElement = document.getElementById(`PostMain-${post.id}`);

//         if (postMainElement) {
//             let observer = new IntersectionObserver((entries) => {
//                 entries[0].isIntersecting ? video.play() : video.pause()
//             }, { threshold: [0.6] });

//             observer.observe(postMainElement);
//         }
//     }, [])

//     return (
        
//     )
// }

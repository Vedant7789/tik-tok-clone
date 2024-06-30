"use client"

import { AiFillHeart } from "react-icons/ai"
import { ImMusic } from "react-icons/im"
import Link from "next/link"
import { useEffect } from "react"
import PostMainLikes from "./PostMainLikes"
import useCreateBucketUrl from "../hooks/useCreateBucketUrl"
import { PostMainCompTypes } from "../types"
import { MdWhereToVote } from "react-icons/md"

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

    return (
        <>
            <div id={`PostMain-${post.id}`} className="flex border-b py-6">

                <div className="cursor-pointer">
                    <img className="rounded-full max-h-[60px]" width="60" src={useCreateBucketUrl(post?.profile?.image)} />
                </div>

                <div className="pl-3 w-full px-4 font-neue-regular ">
                    <div className="flex items-center justify-between pb-0.5">
                        <Link href={`/profile/${post.profile.user_id}`}>
                            <span className="font-bold hover:underline cursor-pointer">
                                {post.profile.name}
                            </span>
                        </Link>

                        <div className="flex gap-4 items-center">
                            
                            <button className="text-[15px] px-[21px] py-0.5 bg2 text-[#ffeef2] hover:bg-[#F02C56]/50 font-semibold font-offbit-101-bold tracking-widest leading-[1] pt-3 pb-2 flex items-center gap-1 transition-all duration-300">
                                <MdWhereToVote className="-translate-y-[3px]" />
                                Proposal
                            </button>
                            <button className="text-[15px] px-[21px] py-0.5 bg2 text-[#ffeef2] hover:bg-[#F02C56]/50 font-semibold font-offbit-101-bold tracking-widest leading-[1] pt-3 pb-2 flex items-center gap-1 transition-all duration-300">
                                <MdWhereToVote className="-translate-y-[3px]" />
                                Profile
                            </button>
                        </div>

                    </div>
                    {/* <p className="text-[15px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]">{post.text}</p> */}
                    {/* <p className="text-[14px] text-gray-500 pb-0.5">#fun #cool #SuperAwesome</p> */}
                    {/* <p className="text-[14px] pb-0.5 flex items-center font-semibold">
                        <ImMusic size="17"/>
                        <span className="px-1">original sound - AWESOME</span>
                        <AiFillHeart size="20"/>
                    </p> */}

                    <div className="mt-2.5 relative justify-center flex">
                        <div
                            className="relative min-h-[480px] max-h-[580px] max-w-[260px] flex items-center bg-black rounded-xl cursor-pointer"
                        >
                            <video 
                                id={`video-${post.id}`}
                                loop
                                controls
                                muted
                                className="rounded-xl object-cover mx-auto h-full" 
                                src={useCreateBucketUrl(post?.video_url)}
                            />
                            {/* <img 
                                className="absolute right-2 bottom-10" 
                                width="90" 
                                src="/images/tiktok-logo-white.png"
                            /> */}
                        <PostMainLikes post={post} />
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

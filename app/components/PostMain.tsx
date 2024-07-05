"use client";

import { AiFillHeart } from "react-icons/ai";
import { ImMusic } from "react-icons/im";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import PostMainLikes from "./PostMainLikes";
import useCreateBucketUrl from "../hooks/useCreateBucketUrl";
import { PostMainCompTypes } from "../types";
import { MdWhereToVote } from "react-icons/md";
import { BsTwitter } from "react-icons/bs";
import { FaPlay, FaPause, FaShare } from "react-icons/fa";
import { toast } from "react-toastify";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { BiLoaderCircle } from "react-icons/bi";

export default function PostMain({
  post,
  isAutoplayEnabled,
}: PostMainCompTypes & { isAutoplayEnabled: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showIcon, setShowIcon] = useState(false);
  const [videoLoding, setVideoLoading] = useState(false);

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  const postRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = document.getElementById(
      `video-${post?.id}`
    ) as HTMLVideoElement;
    // const postMainElement = document.getElementById(`PostMain-${post.id}`);
    const allVideos = document.querySelectorAll("video");

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          allVideos.forEach((v) => {
            if (v !== video) {
              // v.muted = true;
              v.pause();
            }
          });
          video.muted = false;
          video.play();
          setIsPlaying(true);
        } else {
          video.muted = true;
          video.pause();
          setIsPlaying(false);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0.6],
    });

    if (postRef.current) {
      observer.observe(postRef.current);
    }

    return () => {
      if (postRef.current) {
        observer.unobserve(postRef.current);
      }
    };
  }, [postRef.current, isAutoplayEnabled]);

  const openLink = (url: string | null) => url && window.open(url, "_blank");

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.muted = false;

        video.play();
        setIsPlaying(true);
      } else {
        video.muted = true;

        video.pause();
        setIsPlaying(false);
      }
      setShowIcon(true);
      setTimeout(() => setShowIcon(false), 1000);
    }
  };

  const handleMobileVideoClick = () => {
    const video = mobileVideoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setIsPlaying(true);
      } else {
        video.pause();
        setIsPlaying(false);
      }
      setShowIcon(true);
      setTimeout(() => setShowIcon(false), 1000);
    }
  };

  return (
    <div className="relative snap_childrens md:h-full">
      {isTabletOrMobile && (
        <div className="block md:hidden">
          <div
            ref={postRef}
            id={`PostMain-${post.id}`}
            onClick={handleMobileVideoClick}
            className="flex border-b h-[100dvh] md:h-full w-[100vw] relative"
          >
            {videoLoding && (
              <div className="flex w-full font-offbit h-full z-10 absolute top-0 left-0 justify-center items-center">
                {/* <BiLoaderCircle
                  className="animate-spin"
                  color="#ffffff"
                  size={22}
                /> */}
                Tap to play
              </div>
            )}
            <video
              // key={isAutoplayEnabled? "autoplay" : "noautoplay"}

              onLoadStart={() => setVideoLoading(true)}
              onLoadedData={() => setVideoLoading(false)}
              id={`video-${post.id}`}
              ref={mobileVideoRef}
              // autoPlay={isAutoplayEnabled}
              loop
              controls={false}
              playsInline
              onClick={handleVideoClick}
              className="object-cover h-full w-full aspect-auto"
              src={post?.video_url.replace(
                "https://tiktok-catalyst.s3.ap-south-1.amazonaws.com",
                "https://99pitch.b-cdn.net"
              )}
            />
            {showIcon && (
              <div className="absolute z-10 w-full h-full flex items-center justify-center">
                {isPlaying ? (
                  <FaPause className="text-white text-3xl" />
                ) : (
                  <FaPlay className="text-white text-3xl" />
                )}
              </div>
            )}
            <div className="absolute bottom-7 left-5 right-5 ">
              <div className="flex items-center justify-between pb-0.5">
                <div className="flex items-center gap-2">
                  <div className="cursor-pointer">
                    <img
                      className="rounded-full max-h-[30px]"
                      width="30"
                      src={useCreateBucketUrl(post?.profile?.image)}
                    />
                  </div>
                  <Link href={`/profile/${post.profile.user_id}`}>
                    <span className="font-bold hover:underline cursor-pointer text-sm">
                      {post.profile.name}
                    </span>
                  </Link>
                </div>
                <div className="flex gap-4">
                  {post.proposal_link && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openLink(post.proposal_link);
                      }}
                      className="rounded text-[15px] px-3 sm:px-[21px] py-0.5 bg2 text-[#ffeef2] hover:bg-[#F02C56]/50 font-semibold font-offbit-101-bold tracking-widest leading-[1] pt-3 pb-2 flex items-center gap-1 transition-all duration-300 backdrop-blur"
                    >
                      <Image
                        src={"/images/proposal.svg"}
                        width={1000}
                        height={1000}
                        className="w-4 h-4 object-cover -translate-y-[2px]"
                        alt="proposal svg"
                      />
                      <span className="hidden sm:inline-block">Proposal</span>
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openLink(
                        `https://twitter.com/intent/tweet?url=${
                          window.origin + "/" + post.id + "/" + post.user_id
                        }&text=Hey, We've uploaded our pitch in 99pitch`
                      );
                    }}
                    className="rounded text-[15px] px-3 sm:px-[21px] py-0.5 bg2 text-[#ffeef2] hover:bg-[#F02C56]/50 font-semibold font-offbit-101-bold tracking-widest leading-[1] pt-3 pb-2 flex items-center gap-1 transition-all duration-300 backdrop-blur"
                  >
                    <BsTwitter className="-translate-y-[3px]" />
                    <span className="hidden sm:inline-block">Profile</span>
                  </button>
                  <button
                    className="rounded text-[15px] px-3 sm:px-[21px] py-0.5 bg2 text-[#ffeef2] hover:bg-[#F02C56]/50 font-semibold font-offbit-101-bold tracking-widest leading-[1] pt-3 pb-2 flex items-center gap-1 transition-all duration-300 backdrop-blur"
                    onClick={async (e) => {
                      e.stopPropagation();
                      toast.success("Link copied to clipboard");
                      await navigator.clipboard.writeText(
                        `${window.origin}/post/${post.id}/${post.user_id}`
                      );
                    }}
                  >
                    <FaShare size={15} className="mt-[-3px]" />
                    <span className="hidden sm:inline-block">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isTabletOrMobile && (
        <div
          ref={postRef}
          // id={`PostMain-${post.id}`}
          className="hidden md:block"
        >
          <div className="flex border-b py-6">
            <div className="pl-3 w-full px-4 font-neue-regular">
              {/* name and buttons */}
              <div className="flex items-center justify-between pb-0.5">
                <div className="flex items-center gap-2">
                  <div className="cursor-pointer">
                    <img
                      className="rounded-full max-h-[40px]"
                      width="40"
                      src={useCreateBucketUrl(post?.profile?.image)}
                    />
                  </div>
                  <Link href={`/profile/${post.profile.user_id}`}>
                    <span className="font-bold hover:underline cursor-pointer">
                      {post.profile.name}
                    </span>
                  </Link>
                </div>
                <div className="flex gap-4 items-center">
                  {post.proposal_link && (
                    <button
                      onClick={() => openLink(post.proposal_link)}
                      className="rounded text-[15px] px-3 sm:px-[21px] py-0.5 bg2 text-[#ffeef2] hover:bg-[#F02C56]/50 font-semibold font-offbit-101-bold tracking-widest leading-[1] pt-3 pb-2 flex items-center gap-1 transition-all duration-300"
                    >
                      <Image
                        src={"/images/proposal.svg"}
                        width={1000}
                        height={1000}
                        className="w-4 h-4 object-cover -translate-y-[2px]"
                        alt="proposal svg"
                      />
                      <span className="hidden sm:inline-block">Proposal</span>
                    </button>
                  )}
                  <button
                    onClick={() =>
                      openLink(
                        `https://twitter.com/intent/tweet?url=${
                          window.origin + "/" + post.id + "/" + post.user_id
                        }&text=Hey, We've uploaded our pitch in 99pitch`
                      )
                    }
                    className="rounded text-[15px] px-3 sm:px-[21px] py-0.5 bg2 text-[#ffeef2] hover:bg-[#F02C56]/50 font-semibold font-offbit-101-bold tracking-widest leading-[1] pt-3 pb-2 flex items-center gap-1 transition-all duration-300"
                  >
                    <BsTwitter className="-translate-y-[3px]" />
                    <span className="hidden sm:inline-block">Profile</span>
                  </button>
                  <button
                    onClick={async () => {
                      toast.success("Link copied to clipboard");
                      await navigator.clipboard.writeText(
                        `${window.origin}/post/${post.id}/${post.user_id}`
                      );
                    }}
                    className="rounded text-[15px] px-3 sm:px-[21px] py-0.5 bg2 text-[#ffeef2] hover:bg-[#F02C56]/50 font-semibold font-offbit-101-bold tracking-widest leading-[1] pt-3 pb-2 flex items-center gap-1 transition-all duration-300 backdrop-blur"
                  >
                    <FaShare size={15} className="mt-[-3px]" />
                    <span className="hidden sm:inline-block">Share</span>
                  </button>
                </div>
              </div>

              <div className="mt-2.5 relative justify-center flex">
                <div
                  className="relative aspect-[260/480] w-full min-w-[300px] max-w-[450px] flex items-center bg-black rounded-xl cursor-pointer"
                  onClick={handleVideoClick}
                >
                  {videoLoding && (
                    <div className="flex w-full h-full z-10 absolute top-0 left-0 justify-center items-center">
                      <BiLoaderCircle
                        className="animate-spin"
                        color="#ffffff"
                        size={22}
                      />
                    </div>
                  )}
                  <video
                    onLoadStart={() => setVideoLoading(true)}
                    onLoadedData={() => setVideoLoading(false)}
                    // key={isAutoplayEnabled ? "autoplay" : "noautoplay"}
                    id={`video-${post.id}`}
                    ref={videoRef}
                    loop
                    //   autoPlay={isAutoplayEnabled}
                    //   muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
                    src={post?.video_url.replace(
                      "https://tiktok-catalyst.s3.ap-south-1.amazonaws.com",
                      "https://99pitch.b-cdn.net"
                    )}
                  />
                  {showIcon && (
                    <div className="absolute z-10 w-full h-full flex items-center justify-center">
                      {isPlaying ? (
                        <FaPause className="text-white text-3xl" />
                      ) : (
                        <FaPlay className="text-white text-3xl" />
                      )}
                    </div>
                  )}
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <PostMainLikes post={post} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

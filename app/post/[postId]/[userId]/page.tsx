"use client";

import Comments from "@/app/components/post/Comments";
import CommentsHeader from "@/app/components/post/CommentsHeader";
import Link from "next/link";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useRouter } from "next/navigation";
import ClientOnly from "@/app/components/ClientOnly";
import { type Post, PostPageTypes } from "@/app/types";
import { usePostStore } from "@/app/stores/post";
import { useLikeStore } from "@/app/stores/like";
import { useCommentStore } from "@/app/stores/comment";
import { useSwipeable } from "react-swipeable";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export default function Post({ params }: PostPageTypes) {
  let { postById, postsByUser, setPostById, setPostsByUser } = usePostStore();
  let { setLikesByPost } = useLikeStore();
  let { setCommentsByPost } = useCommentStore();

  const router = useRouter();
  const pathname = window.location.href;

  useEffect(() => {
    setPostById(params.postId);
    setCommentsByPost(params.postId);
    setLikesByPost(params.postId);
    setPostsByUser(params.userId);
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const handleSwipeUp = () => {
    const nextPost = postsByUser.find((post) => post.id > params.postId);
    if (nextPost) {
      router.push(`/post/${nextPost.id}/${params.userId}`);
    }
  };

  const handleSwipeDown = () => {
    const prevPost = postsByUser.find((post) => post.id < params.postId);
    if (prevPost) {
      router.push(`/post/${prevPost.id}/${params.userId}`);
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedUp: handleSwipeUp,
    onSwipedDown: handleSwipeDown,
    trackMouse: true,
  });

  return (
    <>
      <meta property="og:image" content={`${postById?.video_url}`} />
      <meta property="og:video" content={`${postById?.video_url}`} />
      <meta property="og:url" content={pathname} />
      <meta property="og:title" content="99pitch" />
      <meta property="og:description" content={`${postById?.text}`} />
      <meta property="og:type" content="video" />
      <div
        id="PostPage"
        className="w-full h-screen fixed left-0 top-0 z-[0] flex justify-center items-center bg-[#000]/60 backdrop-blur-lg"
        {...swipeHandlers}
      >
        <div className="lg:w-[calc(100%-540px)] h-full relative">
          <Link
            href={`/profile/${params?.userId}`}
            className="absolute text-white z-20 m-5 rounded-full bg-gray-300/10 p-1.5 hover:bg-gray-300/50"
          >
            <AiOutlineClose size="27" />
          </Link>

          <div>
            <button
              onClick={() => handleSwipeUp()}
              className="absolute z-20 right-4 top-4 flex items-center justify-center rounded-full bg-gray-300/10 p-1.5 hover:bg-gray-300/50"
            >
              <BiChevronUp size="30" color="#FFFFFF" />
            </button>

            <button
              onClick={() => handleSwipeDown()}
              className="absolute z-20 right-4 top-20 flex items-center justify-center rounded-full bg-gray-300/10 p-1.5 hover:bg-gray-300/50"
            >
              <BiChevronDown size="30" color="#FFFFFF" />
            </button>
          </div>

          <ClientOnly>
            {postById?.video_url ? (
              <video
                className="fixed object-cover w-full my-auto z-[0] h-screen"
                src={postById?.video_url}
              />
            ) : null}

            <div className="bg-black bg-opacity-70 lg:min-w-[480px] z-10 relative">
              {postById?.video_url ? (
                <video
                  playsInline
                  autoPlay
                  controls={false}
                  loop
                  className="h-screen mx-auto"
                  src={postById.video_url}
                />
              ) : null}
            </div>
          </ClientOnly>
        </div>

        <div
          id="InfoSection"
          className="lg:max-w-[550px] h-[45%]  md:h-full bottom-0 left-0 right-0 md:rounded-none rounded-t-3xl z-[99] w-full  bg-[#121316] text-white md:relative absolute"
        >
          <div className="py-3 md:py-7" />

          <ClientOnly>
            {postById ? (
              <CommentsHeader post={postById} params={params} />
            ) : null}
          </ClientOnly>
          <Comments params={params} />
        </div>
      </div>
    </>
  );
}

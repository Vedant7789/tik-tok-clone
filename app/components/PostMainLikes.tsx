import { AiFillHeart } from "react-icons/ai";
import { FaShare, FaCommentDots } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useUser } from "../context/user";
import { BiLoaderCircle } from "react-icons/bi";
import { useGeneralStore } from "../stores/general";
import { useRouter } from "next/navigation";
import { Comment, Like, PostMainLikesCompTypes } from "../types";
import { useGetCommentsByPostId } from "../hooks/comments/index";
import {
  useGetLikesByPostId,
  useIsLiked,
  useCreateLike,
  useDeleteLike,
} from "../hooks/likes/index";

export default function PostMainLikes({ post }: PostMainLikesCompTypes) {
  let { setIsLoginOpen } = useGeneralStore();

  const router = useRouter();
  const contextUser = useUser();
  const [hasClickedLike, setHasClickedLike] = useState<boolean>(false);
  const [userLiked, setUserLiked] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [likes, setLikes] = useState<Like[]>([]);
  const [openMessage, setOpenMessage] = useState<boolean>(false);

  useEffect(() => {
    getAllLikesByPost();
    getAllCommentsByPost();
  }, [post]);

  useEffect(() => {
    hasUserLikedPost();
  }, [likes, contextUser]);

  const getAllCommentsByPost = async () => {
    let result = await useGetCommentsByPostId(post?.id);
    setComments(result);
  };

  const getAllLikesByPost = async () => {
    let result = await useGetLikesByPostId(post?.id);
    setLikes(result);
  };

  const hasUserLikedPost = () => {
    if (!contextUser) return;

    if (likes?.length < 1 || !contextUser?.user?.id) {
      setUserLiked(false);
      return;
    }
    let res = useIsLiked(contextUser?.user?.id, post?.id, likes);
    setUserLiked(res ? true : false);
  };

  const like = async () => {
    setHasClickedLike(true);
    await useCreateLike(contextUser?.user?.id || "", post?.id);
    await getAllLikesByPost();
    hasUserLikedPost();
    setHasClickedLike(false);
  };

  const unlike = async (id: string) => {
    setHasClickedLike(true);
    await useDeleteLike(id);
    await getAllLikesByPost();
    hasUserLikedPost();
    setHasClickedLike(false);
  };

  const likeOrUnlike = () => {
    if (!contextUser?.user?.id) {
      setIsLoginOpen(true);
      return;
    }

    let res = useIsLiked(contextUser?.user?.id, post?.id, likes);

    if (!res) {
      like();
    } else {
      likes.forEach((like: Like) => {
        if (
          contextUser?.user?.id == like?.user_id &&
          like?.post_id == post?.id
        ) {
          unlike(like?.id);
        }
      });
    }
  };

  const handleShareClick = () => {
    const currentPageUrl = `${window.location.href}post/${post?.id}/${post?.profile?.user_id}`;
    navigator.clipboard
      .writeText(currentPageUrl)
      .then(
        () => void setOpenMessage(true),
        void setTimeout(() => setOpenMessage(false), 2000)
      )
      .catch((error) => console.error(error));
  };

  return (
    <>
      <div id={`PostMainLikes-${post?.id}`} className="mr-[75px]">
        <div className="absolute flex flex-col items-center bottom-12 right-3 pl-2">
          <div className="pb-4 text-center flex flex-col gap-1">
            <button
              disabled={hasClickedLike}
              onClick={(e) => {
                e.stopPropagation();
                likeOrUnlike();
              }}
              className="rounded-full bg-gray-900  p-2 cursor-pointer"
            >
              {!hasClickedLike ? (
                <AiFillHeart
                  color={likes?.length > 0 && userLiked ? "#ff2626" : ""}
                  size="25"
                />
              ) : (
                <BiLoaderCircle className="animate-spin" size="25" />
              )}
            </button>
            <span className="text-xs text-gray-300 font-semibold">
              {likes?.length}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/post/${post?.id}/${post?.profile?.user_id}`);
            }}
            className="pb-4 text-center"
          >
            <div className="rounded-full bg-gray-900  p-2 cursor-pointer">
              <FaCommentDots size="25" />
            </div>
            <span className="text-xs text-gray-300 font-semibold">
              {comments?.length}
            </span>
          </button>

          <button className="relative text-center" onClick={handleShareClick}>
            <div className=" rounded-full bg-gray-900 p-2 cursor-pointer">
              <FaShare size="25" />
            </div>
            {/* <span className="text-xs text-gray-300 font-semibold">55</span> */}
            <span
              className={`${
                openMessage
                  ? "absolute left-1/2 top-12 block -translate-x-1/2 bg-black p-2 text-sm capitalize opacity-100 transition-[opacity] duration-500"
                  : " opacity-0 hidden"
              }`}
            >
              Copied
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

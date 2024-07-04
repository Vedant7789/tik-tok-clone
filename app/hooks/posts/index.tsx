import { database, ID, Query, storage } from "@/libs/AppWriteClient";
import { useGetProfileByUserId } from "../profile";
import { useDeleteLike, useGetLikesByPostId } from "../likes";
import { useDeleteComment, useGetCommentsByPostId } from "../comments";

const NEXT_PUBLIC_DATABASE_ID = String(process.env.NEXT_PUBLIC_DATABASE_ID);
const NEXT_PUBLIC_COLLECTION_ID_POST = String(
  process.env.NEXT_PUBLIC_COLLECTION_ID_POST
);

import axios from "axios";

const useCreatePost = async (
  file: File,
  userId: string,
  caption: string,
  catalystLink: string,
  twitterLink: string
) => {
  const videoId = Math.random().toString(36).slice(2, 22);
  const reader = new FileReader();

  reader.readAsDataURL(file);

  await new Promise((resolve, reject) => {
    reader.onloadend = async () => {
      const base64Data = (reader.result as string)?.split(",")[1];

      try {
        const response = await axios.post(
          "https://seashell-app-2nbul.ondigitalocean.app/api/upload",
          {
            file: base64Data,
            fileName: videoId,
          }
        );

        console.log(response);

        const fileUrl = response.data.fileUrl;
        //   console.log(fileUrl);

        await database.createDocument(
          NEXT_PUBLIC_DATABASE_ID,
          NEXT_PUBLIC_COLLECTION_ID_POST,
          ID.unique(),
          {
            user_id: userId,
            text: caption,
            video_url: fileUrl,
            proposal_link: catalystLink,
            twitter_link: twitterLink,
            created_at: new Date().toISOString(),
          }
        );

        resolve(true);
      } catch (error) {
        reject(error);
        throw error;
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

const useGetAllPosts = async () => {
  try {
    const response = await database.listDocuments(
      NEXT_PUBLIC_DATABASE_ID,
      NEXT_PUBLIC_COLLECTION_ID_POST,
      [Query.orderDesc("$id")]
    );
    const documents = response.documents;

    const objPromises = documents.map(async (doc) => {
      let profile = await useGetProfileByUserId(doc?.user_id);

      return {
        id: doc?.$id,
        user_id: doc?.user_id,
        video_url: doc?.video_url,
        text: doc?.text,
        created_at: doc?.created_at,
        profile: {
          user_id: profile?.user_id,
          name: profile?.name,
          image: profile?.image,
        },
        proposal_link: doc.proposal_link,
        twitter_link: doc.twitter_link,
      };
    });

    const result = await Promise.all(objPromises);
    return result;
  } catch (error) {
    throw error;
  }
};

const useGetPostById = async (id: string) => {
  try {
    const post = await database.getDocument(
      NEXT_PUBLIC_DATABASE_ID,
      NEXT_PUBLIC_COLLECTION_ID_POST,
      id
    );

    const profile = await useGetProfileByUserId(post?.user_id);

    return {
      id: post?.$id,
      user_id: post?.user_id,
      video_url: post?.video_url,
      text: post?.text,
      created_at: post?.created_at,
      profile: {
        user_id: profile?.user_id,
        name: profile?.name,
        image: profile?.image,
      },
      proposal_link: post.proposal_link,
      twitter_link: post.twitter_link,
    };
  } catch (error) {
    throw error;
  }
};

const useGetPostsByUser = async (userId: string) => {
  try {
    const response = await database.listDocuments(
      NEXT_PUBLIC_DATABASE_ID,
      NEXT_PUBLIC_COLLECTION_ID_POST,
      [Query.equal("user_id", userId), Query.orderDesc("$id")]
    );
    const documents = response.documents;
    const result = documents.map((doc) => {
      return {
        id: doc?.$id,
        user_id: doc?.user_id,
        video_url: doc?.video_url,
        text: doc?.text,
        created_at: doc?.created_at,
      };
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const useDeletePostById = async (postId: string, currentImage: string) => {
  try {
    const likes = await useGetLikesByPostId(postId);
    likes.forEach(async (like) => {
      await useDeleteLike(like?.id);
    });

    const comments = await useGetCommentsByPostId(postId);
    comments.forEach(async (comment) => {
      await useDeleteComment(comment?.id);
    });

    await database.deleteDocument(
      NEXT_PUBLIC_DATABASE_ID,
      NEXT_PUBLIC_COLLECTION_ID_POST,
      postId
    );
    await storage.deleteFile(
      String(process.env.NEXT_PUBLIC_BUCKET_ID),
      currentImage
    );
  } catch (error) {
    throw error;
  }
};

export {
  useCreatePost,
  useDeletePostById,
  useGetAllPosts,
  useGetPostsByUser,
  useGetPostById,
};

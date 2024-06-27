import { database, ID, Query } from "@/libs/AppWriteClient";
import { Like } from "../../types";

const NEXT_PUBLIC_DATABASE_ID = String(process.env.NEXT_PUBLIC_DATABASE_ID);
const NEXT_PUBLIC_COLLECTION_ID_LIKE = String(
  process.env.NEXT_PUBLIC_COLLECTION_ID_LIKE
);

const useIsLiked = (userId: string, postId: string, likes: Array<Like>) => {
  let res: Like[] = [];
  likes?.forEach((like) => {
    if (like.user_id == userId && like.post_id == postId) res.push(like);
  });
  if (typeof res == undefined) return;
  return res.length > 0;
};

const useCreateLike = async (userId: string, postId: string) => {
  try {
    await database.createDocument(
      NEXT_PUBLIC_DATABASE_ID,
      NEXT_PUBLIC_COLLECTION_ID_LIKE,
      ID.unique(),
      {
        user_id: userId,
        post_id: postId,
      }
    );
  } catch (error) {
    throw error;
  }
};

const useDeleteLike = async (id: string) => {
  try {
    await database.deleteDocument(
      NEXT_PUBLIC_DATABASE_ID,
      NEXT_PUBLIC_COLLECTION_ID_LIKE,
      id
    );
  } catch (error) {
    throw error;
  }
};

const useGetLikesByPostId = async (postId: string) => {
  try {
    const response = await database.listDocuments(
      NEXT_PUBLIC_DATABASE_ID,
      NEXT_PUBLIC_COLLECTION_ID_LIKE,
      [Query.equal("post_id", postId)]
    );
    const documents = response.documents;
    const result = documents.map((doc) => {
      return {
        id: doc?.$id,
        user_id: doc?.user_id,
        post_id: doc?.post_id,
      };
    });

    return result;
  } catch (error) {
    throw error;
  }
};

export { useGetLikesByPostId, useIsLiked, useCreateLike, useDeleteLike };

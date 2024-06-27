import { database, ID, Query } from "@/libs/AppWriteClient";
import { useGetProfileByUserId } from "../profile";

const NEXT_PUBLIC_DATABASE_ID = String(process.env.NEXT_PUBLIC_DATABASE_ID);
const NEXT_PUBLIC_COLLECTION_ID_COMMENT = String(
  process.env.NEXT_PUBLIC_COLLECTION_ID_COMMENT
);

const useCreateComment = async (
  userId: string,
  postId: string,
  comment: string
) => {
  try {
    await database.createDocument(
      NEXT_PUBLIC_DATABASE_ID,
      NEXT_PUBLIC_COLLECTION_ID_COMMENT,
      ID.unique(),
      {
        user_id: userId,
        post_id: postId,
        text: comment,
        created_at: new Date().toISOString(),
      }
    );
  } catch (error) {
    throw error;
  }
};
const useDeleteComment = async (id: string) => {
  try {
    await database.deleteDocument(
      NEXT_PUBLIC_DATABASE_ID,
      NEXT_PUBLIC_COLLECTION_ID_COMMENT,
      id
    );
  } catch (error) {
    throw error;
  }
};

const useGetCommentsByPostId = async (postId: string) => {
  try {
    const commentsResult = await database.listDocuments(
      NEXT_PUBLIC_DATABASE_ID,
      NEXT_PUBLIC_COLLECTION_ID_COMMENT,
      [Query.equal("post_id", postId), Query.orderDesc("$id")]
    );

    const objPromises = commentsResult.documents.map(async (comment) => {
      const profile = await useGetProfileByUserId(comment.user_id);

      return {
        id: comment?.$id,
        user_id: comment?.user_id,
        post_id: comment?.post_id,
        text: comment?.text,
        created_at: comment?.created_at,
        profile: {
          user_id: profile?.user_id,
          name: profile?.name,
          image: profile?.image,
        },
      };
    });

    const result = await Promise.all(objPromises);
    return result;
  } catch (error) {
    throw error;
  }
};

export { useCreateComment, useGetCommentsByPostId, useDeleteComment };

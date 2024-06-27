import { database, ID, Query } from "@/libs/AppWriteClient";

const NEXT_PUBLIC_DATABASE_ID = String(process.env.NEXT_PUBLIC_DATABASE_ID);
const NEXT_PUBLIC_COLLECTION_ID_PROFILE = String(
  process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE
);

const useCreateProfile = async (
  userId: string,
  name: string,
  image: string,
  bio: string
) => {
  try {
    await database.createDocument(
      NEXT_PUBLIC_DATABASE_ID,
      NEXT_PUBLIC_COLLECTION_ID_PROFILE,
      ID.unique(),
      {
        user_id: userId,
        name: name,
        image: image,
        bio: bio,
      }
    );
  } catch (error) {
    throw error;
  }
};

const useGetProfileByUserId = async (userId: string) => {
  try {
    const response = await database.listDocuments(
      NEXT_PUBLIC_DATABASE_ID,
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE),
      [Query.equal("user_id", userId)]
    );
    const documents = response.documents;
    return {
      id: documents[0]?.$id,
      user_id: documents[0]?.user_id,
      name: documents[0]?.name,
      image: documents[0]?.image,
      bio: documents[0]?.bio,
    };
  } catch (error) {
    throw error;
  }
};
const useGetRandomUsers = async () => {
  try {
    const profileResult = await database.listDocuments(
      NEXT_PUBLIC_DATABASE_ID,
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE),
      [Query.limit(5)]
    );
    const documents = profileResult.documents;

    const objPromises = documents.map((profile) => {
      return {
        id: profile?.user_id,
        name: profile?.name,
        image: profile?.image,
      };
    });

    const result = await Promise.all(objPromises);
    return result;
  } catch (error) {
    console.log(error);
  }
};
const useSearchProfilesByName = async (name: string) => {
  try {
    const profileResult = await database.listDocuments(
      NEXT_PUBLIC_DATABASE_ID,
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE),
      [Query.limit(5), Query.search("name", name)]
    );

    const objPromises = profileResult.documents.map((profile) => {
      return {
        id: profile?.user_id,
        name: profile?.name,
        image: profile?.image,
      };
    });

    const result = await Promise.all(objPromises);
    return result;
  } catch (error) {
    console.log(error);
  }
};

const useUpdateProfile = async (id: string, name: string, bio: string) => {
  try {
    await database.updateDocument(
      NEXT_PUBLIC_DATABASE_ID,
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE),
      id,
      {
        name: name,
        bio: bio,
      }
    );
  } catch (error) {
    throw error;
  }
};

const useUpdateProfileImage = async (id: string, image: string) => {
  try {
    await database.updateDocument(
      NEXT_PUBLIC_DATABASE_ID,
      String(process.env.NEXT_PUBLIC_COLLECTION_ID_PROFILE),
      id,
      {
        image: image,
      }
    );
  } catch (error) {
    throw error;
  }
};

export {
  useUpdateProfile,
  useUpdateProfileImage,
  useGetProfileByUserId,
  useGetRandomUsers,
  useSearchProfilesByName,
  useCreateProfile,
};

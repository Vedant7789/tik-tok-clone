import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { Post, PostWithProfile } from "../types";
import {
    useGetAllPosts,
    useGetPostsByUser,
    useGetPostById,
} from "../hooks/posts/index";

interface PostStore {
    allPosts: PostWithProfile[];
    postsByUser: Post[];
    postById: PostWithProfile | null;
    loading: boolean;
    setAllPosts: () => void;
    setPostsByUser: (userId: string) => void;
    setPostById: (postId: string) => void;
}

export const usePostStore = create<PostStore>()(
    devtools(
        persist(
            (set) => ({
                allPosts: [],
                postsByUser: [],
                postById: null,
                loading: true,

                setAllPosts: async () => {
                    set({ loading: true });
                    const result = await useGetAllPosts();
                    set({ allPosts: result, loading: false });
                },
                setPostsByUser: async (userId: string) => {
                    set({ loading: true });
                    const result = await useGetPostsByUser(userId);
                    set({ postsByUser: result, loading: false });
                },
                setPostById: async (postId: string) => {
                    set({ loading: true });
                    const result = await useGetPostById(postId);
                    set({ postById: result, loading: false });
                },
            }),
            {
                name: "store",
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);

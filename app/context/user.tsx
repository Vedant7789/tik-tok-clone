"use client";

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { account, ID } from "@/libs/AppWriteClient";
import { User, UserContextTypes } from "../types";
import { useRouter } from "next/navigation";
import { useGetProfileByUserId } from "../hooks/profile/index";
import { useCreateProfile } from "../hooks/profile/index";
import { success, error } from "../utils/toast";

const UserContext = createContext<UserContextTypes | null>(null);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    const checkUser = async (t?: "login" | "register") => {
        try {
            const currentSession = await account.getSession("current");
            if (!currentSession) return;

            const promise = (await account.get()) as any;
            const profile = await useGetProfileByUserId(promise?.$id);
            if(t === "login") {
                success(`Welcome back, ${profile.name}!`)
            } else if (t === "register") {
                success(`Welcome, ${profile.name}!`)
            } else {
                success(`Session Restored and welcome back, ${profile.name}!`)
            }
            
            setUser({
                id: promise?.$id,
                name: promise?.name,
                bio: profile?.bio,
                image: profile?.image,
            });
        } catch (error) {
            setUser(null);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    const register = async (name: string, email: string, password: string) => {
        try {
            const promise = await account.create(ID.unique(), email, password, name);
            await account.createEmailSession(email, password);

            await useCreateProfile(
                promise?.$id,
                name,
                String(process.env.NEXT_PUBLIC_PLACEHOLDER_DEAFULT_IMAGE_ID),
                ""
            );
            await checkUser("register");
            return true;
        } catch (e: any) {
            error(`${e.message}`)
            console.error(e);
            return false;
        }
    };

    const login = async (email: string, password: string) => {
        try {
            // Step 1: Attempt to create an email session
            await account.createEmailSession(email, password);
            checkUser("login");
            return true;
        } catch (e: any) {
            error(`${e.message}`);
            console.error(e);
            return false;
        }
    };

    const logout = async () => {
        try {
            await account.deleteSession("current");
            success(`Logout Successfully!`)
            setUser(null);
            router.refresh();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <UserContext.Provider value={{ user, register, login, logout, checkUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;

export const useUser = () => useContext(UserContext);

import TextInput from "../TextInput";
import { useState, useCallback } from "react";
import { ShowErrorObject } from "@/app/types";
import { useUser } from "@/app/context/user";
import { useGeneralStore } from "@/app/stores/general";
import { BiLoaderCircle } from "react-icons/bi";
import useKeyPress from "@/app/hooks/useKeyPress"; // Import the custom hook

export default function Login() {
    let { setIsLoginOpen } = useGeneralStore();

    const contextUser = useUser();

    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string | "">("");
    const [password, setPassword] = useState<string | "">("");
    const [error, setError] = useState<ShowErrorObject | null>(null);

    const showError = (type: string) => {
        if (error && Object.entries(error).length > 0 && error?.type == type) {
            return error.message;
        }
        return "";
    };

    const validate = () => {
        setError(null);
        let isError = false;

        if (!email) {
            setError({ type: "email", message: "An Email is required" });
            isError = true;
        } else if (!password) {
            setError({ type: "password", message: "A Password is required" });
            isError = true;
        }
        return isError;
    };

    const login = async () => {
        let isError = validate();
        if (isError) return;
        if (!contextUser) return;

        try {
            setLoading(true);
            const success = await contextUser.login(email, password);
            setLoading(false);
            if(success) {
                setIsLoginOpen(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    // Use Ctrl + Enter for login
    // useKeyPress(login, "Control", "Enter");

    useKeyPress(login, "Enter");

    return (
        <>
            <div>
                <h1 className="text-center text-[28px] mb-6 font-bold font-offbit-101-bold">Log in</h1>

                <div className="px-6 pb-2 mb-4">
                    <TextInput
                        string={email}
                        placeholder="Email address"
                        onUpdate={setEmail}
                        inputType="email"
                        error={showError("email")}
                    />
                </div>

                <div className="px-6 pb-2">
                    <TextInput
                        string={password}
                        placeholder="Password"
                        onUpdate={setPassword}
                        inputType="password"
                        error={showError("password")}
                    />
                </div>

                <div className="px-6 pb-2 mt-6">
                    <button
                        disabled={loading || !email || !password}
                        onClick={() => login()}
                        className={`flex items-center justify-center w-full text-[17px] font-semibold text-white py-3 rounded-sm  bg2 disabled:cursor-not-allowed disabled:opacity-50 font-helvetica-light tracking-wider`}
                    >
                        {loading ? (
                            <BiLoaderCircle className="animate-spin" color="#ffffff" size={25} />
                        ) : (
                            "Log in"
                        )}
                    </button>
                </div>
            </div>
        </>
    );
}

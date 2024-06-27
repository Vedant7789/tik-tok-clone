import { AiOutlineClose } from "react-icons/ai";
import { useGeneralStore } from"@/app/stores/general"
import Login from '@/app/components/auth/Login'
import Register from '@/app/components/auth/Register'
import { useState } from "react";
 
export default function AuthOverlay() {
    let { setIsLoginOpen } = useGeneralStore()

    let [isRegister, setIsRegister] = useState<boolean>(false)

    return (
        <>
            <div 
                id="AuthOverlay" 
                className="w-full h-screen fixed left-0 top-0 z-[999] flex justify-center items-center bg-[#000]/60 backdrop-blur-lg"
            >
                <div className="relative bg-[#121316] w-full max-w-[470px] h-auto p-4 rounded-lg">

                    <div className="w-full flex justify-end">
                        <button onClick={() => setIsLoginOpen(false)} className="p-1.5 rounded-full bg-gray-300/10">
                            <AiOutlineClose size="26"/>
                        </button>
                    </div>

                    {isRegister ? <Register /> : <Login />}

                    <div className="flex items-center justify-center py-5 left-0 bottom-0 border-t w-full mt-6">
                        <span className="text-[14px] text-gray-600">Don’t have an account?</span>

                        <button onClick={() => setIsRegister(isRegister = !isRegister)} className="text-[14px] text-[#F02C56] font-semibold pl-1" >
                            <span>{!isRegister ? 'Register' : 'Log in'}</span>
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

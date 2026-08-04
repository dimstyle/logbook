import React, { useRef, useState } from "react"
import { type loginRequestBody } from "../../types/auth.js"
import { type DefaultResponse } from "../../types/default.js"
import ErrorPage from "../ui/ErrorPage.js";
import NotVisible from "../../../../assets/not-visible-svgrepo-com.png";
import { router } from "@inertiajs/react";
import api from "../../lib/axios.js";

export default function Login(){
    const emailRef: React.RefObject<HTMLInputElement|null> = useRef(null);
    const passwordRef: React.RefObject<HTMLInputElement|null> = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleToggle = (): void => {
        setShowPassword((prev) => !prev);
    }

    const loginEvent = async ()=>{
        if ( !emailRef.current || !passwordRef.current) return;
        if ( !emailRef.current.value || !passwordRef.current.value) return;
    

        const payload: loginRequestBody = {
            email : emailRef.current.value,
            password: passwordRef.current.value
        }

        try{
            const response = await api.post<DefaultResponse>('/api/auth/login', payload);
            const resdata = response.data;

            alert(resdata.message);

            // router.get('/clock-in')
        }catch(err: unknown){
            const axiosError = err as { response?: { data?: DefaultResponse; status?: number }; message?: string };
            const message = axiosError?.response?.data?.message ?? axiosError?.message ?? 'Something went wrong';
            const status = axiosError?.response?.status ?? 500;

            setError(JSON.stringify({ message, status }));
        }
    }

    if (error){
        const errorMessage = JSON.parse(error)
        return <ErrorPage errorMessage={errorMessage}  backPath="/login"/>
    }

    return(
        <div className="flex h-screen w-full justify-center items-center">
            <div>
                <span className="flex bg-[#FF5454] justify-center items-end font-freckle p-5 w-100 rounded-tl-lg rounded-tr-lg">
                    <h1 className="text-white text-4xl">Login</h1>
                    <h1 className="text-[#560000] text-2xl">User</h1>
                </span>
                <span className="flex bg-[#C0BDBD] flex-col p-5 rounded-bl-lg rounded-br-lg gap-3">
                    <h2>Email</h2>
                    <input ref={emailRef} type="email" className="w-full p-1.5 bg-white rounded-lg" />
                    <h2>Password</h2>
                    <div className="relative justify-between items-center w-full bg-white rounded-lg">
                        <input ref={passwordRef} type={showPassword ? 'text' : 'password'} className="w-full p-1.5 bg-white rounded-lg" />
                        <button onClick={handleToggle} className={`absolute ${showPassword ? 'bg-[#FF5454]' : 'bg-white'} inset-y-0 right-0 flex items-center pr-3 pl-3 border-l-2 border-black cursor-pointer rounded-r-lg transition-all duration-300`}><img src={NotVisible} width={25} /></button>
                    </div>
                    <div className="flex justify-center mt-5">
                        <button onClick={loginEvent} className="flex justify-center items-center bg-[#FF5454] w-20 rounded-lg p-1.5 cursor-pointer text-white ">Login</button>
                    </div>
                </span>
            </div>
        </div>
    )
}
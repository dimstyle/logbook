import React , { useEffect, useRef, useState } from "react";
import Navbar from "../../Components/User/Navbar.js";
import ProfileIcon from "../../../../assets/download-removebg-preview.png";
import EditIcon from "../../../../assets/edit-svgrepo-com.png"
import { type getUserProfileResponse } from "../../types/user.js";
import ErrorPage from "../ui/ErrorPage.js";
import api from "../../lib/axios.js";
import { Link } from "@inertiajs/react";
import LoadingPage from "../ui/LoadingPage.js";


export default function Profile() {
    const isFetched = useRef(false);
    const [user, setUser] = useState<getUserProfileResponse>();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        if (isFetched.current) return;
        isFetched.current = true;

        ;(async ()=>{
            try{
                const response = await api.get<getUserProfileResponse>('/api/user/getuserprofile');
                const resData = response.data;

                setUser(resData);

            }catch(err: unknown){
                const axiosError = err as { response?: { data?: { message?: string }; status?: number }; message?: string };
                const message = axiosError?.response?.data?.message ?? axiosError?.message ?? 'Something went wrong';
                const status = axiosError?.response?.status ?? 500;

                setError(JSON.stringify({ message, status }));
            }finally{
                setLoading(false)
            }
        })()    
    })

    if(loading){
        return <LoadingPage />
    }

    if (error){
        const errMessage = JSON.parse(error);
        return <ErrorPage errorMessage={errMessage} backPath="/login"/>
    }

    const UserData = user?.user;

    return (
        <>
            <Navbar>
                <div className="w-full justify-start" />
                <div className="flex gap-2 items-center w-60 mr-2 text-white">
                    <a href="/" className="p-1">History</a>
                    <a href="/clock-in" className="p-1">Attendance</a>
                    <a href="/login" className="p-1">Logout</a>
                </div>
            </Navbar>
            <div className="p-4 pl-40 pr-40 pt-30">
                <div className="bg-[#F4F4F4] w-full p-10 rounded-xl">
                    <div className="flex items-center">
                        <img src={ProfileIcon} alt="UserIcon" />
                        <div className="flex flex-col w-full gap-8 ml-5">
                            <h1 className="text-3xl">{UserData?.nama_lengkap}</h1>
                            <h2 className="text-[#1D4ED8] text-xl">{UserData?.role}</h2>
                        </div>
                        <div className="flex w-full justify-end mr-10">
                            <Link href="/user_profile/edit" className="flex items-center gap-2 bg-[#F3E8FF] p-2 rounded-xl text-[#7C3AED]">Edit <img src={EditIcon} alt="EditIcon" width={"20px"} /></Link>
                        </div>
                    </div>
                    <div className="flex flex-col mx-5 mt-20">
                        <h1 className="text-xl">Informasi Siswa</h1>
                        <div className="flex gap-20 mt-10">
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Sekolah</h1>
                                <h1>{UserData?.sekolah}</h1>
                            </div>
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Jurusan</h1>
                                <h1>{UserData?.jurusan}</h1>
                            </div>
                        </div>
                        <div className="flex gap-20 mt-10">
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Email</h1>
                                <h1>{UserData?.email}</h1>
                            </div>
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Nomor HP</h1>
                                <h1>{UserData?.nomor_telepon}</h1>
                            </div>
                        </div>
                        <div className="flex gap-20 mt-10">
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Username</h1>
                                <h1>{UserData?.username}</h1>
                            </div>
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">User ID</h1>
                                <h1>{UserData?.account_id}</h1>
                            </div>
                        </div>
                        <div className="flex gap-30 mt-20 mb-10">
                            <div className="flex flex-col items-center bg-[#FFC7C7] w-full rounded-lg p-4 py-10">
                                <h1 className="text-xl text-[#FF5454]">{UserData?.hadir}</h1>
                                <h1>Hadir</h1>
                            </div>
                            <div className="flex flex-col items-center bg-[#FFC7C7] w-full rounded-lg p-4 py-10">
                                <h1 className="text-xl text-[#FF5454]">{UserData?.tidak_masuk}</h1>
                                <h1>Tidak Masuk</h1>
                            </div>
                            <div className="flex flex-col items-center bg-[#FFC7C7] w-full rounded-lg p-4 py-10">
                                <h1 className="text-xl text-[#FF5454]">{UserData?.laporan}</h1>
                                <h1>Laporan</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
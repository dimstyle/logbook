import React , { useEffect, useRef, useState } from "react";
import UserNavbar from "../../Components/User/UserNavbar.js";
import ProfileIcon from "../../../../assets/download-removebg-preview.png";
import EditIcon from "../../../../assets/edit-svgrepo-com.png"
import { type getUserProfileResponse } from "../../types/user.js";
import ErrorPage from "../ui/ErrorPage.js";
import api from "../../lib/axios.js";
import { Link } from "@inertiajs/react";
import LoadingPage from "../ui/LoadingPage.js";


export default function Profile() {
    const [user, setUser] = useState<getUserProfileResponse>();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const isFetched = useRef(false);

    useEffect(()=>{
        if (isFetched.current) return;
        isFetched.current = true;

        ;(async ()=>{
            try{
                const response = await api.get<getUserProfileResponse>('/api/user/getuserprofile');
                const resData = response.data;

                if(resData?.user?.profile_photo){
                    resData.user.profile_photo = '/storage/'+resData.user.profile_photo;
                }
                
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
    },[])

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
            <UserNavbar />

            <div className="p-4 pl-40 pr-40 pt-30">
                <div className="bg-[#F4F4F4] w-full p-10 rounded-xl">
                    <div className="flex items-center">
                        <div className="flex items-center w-110 h-42">
                            {UserData?.profile_photo ? (
                                <img className="rounded-full ml-3 mt-3 mb-4 mr-3 object-cover aspect-square max-h-35 md:max-h-35 lg:max-h-35 max-w-35 md:max-w-35 lg:max-w-35" src={UserData?.profile_photo} alt="UserIcon" />
                            ) : (
                                <img className="rounded-full object-cover aspect-square max-h-60 md:max-h-60 lg:max-h-60 max-w-60 md:max-w-60 lg:max-w-60" src={ProfileIcon} alt="UserIcon" />
                            )}
                        </div>
                        <div className="flex flex-col w-full gap-8 ml-5">
                            <h1 className="text-3xl">{UserData?.nama_lengkap}</h1>
                            <h2 className="text-[#1D4ED8] text-xl">{UserData?.role}</h2>
                        </div>
                        <div className="flex w-full justify-end mr-10">
                            <Link href="/user_profile/edit" 
                                className="flex items-center gap-2 bg-[#F3E8FF] p-2 rounded-xl text-[#7C3AED]">Edit <img src={EditIcon} alt="EditIcon" width={"20px"} /></Link>
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
                                <h1 className="text-xl text-[#666]">Divisi</h1>
                                <h1>{UserData?.divisi}</h1>
                            </div>
                        </div>
                        <div className="flex gap-30 mt-20 mb-10">
                            <div className="flex flex-col text-center justify-center bg-[#FFC7C7] w-full h-30 rounded-lg px-2 py-10">
                                <h1 className="text-xl text-[#FF5454]">{UserData?.hadir}</h1>
                                <h1>Hadir</h1>
                            </div>
                            <div className="flex flex-col text-center justify-center bg-[#FFC7C7] w-full h-30 rounded-lg px-2 py-10">
                                <h1 className="text-xl text-[#FF5454]">{UserData?.tidak_masuk}</h1>
                                <h1>Tidak Masuk</h1>
                            </div>
                            <div className="flex flex-col text-center justify-center bg-[#FFC7C7] w-full h-30 rounded-lg px-2 py-10">
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
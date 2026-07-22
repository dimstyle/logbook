import AdminNavbar from "../../Components/Admin/AdminNavbar.js";
import ProfileIcon from "../../../../assets/download-removebg-preview.png";
import { useEffect, useRef, useState } from "react";
import type { getUserProfileResponse } from "../../types/user.js";
import { router, usePage } from "@inertiajs/react";
import api from "../../lib/axios.js";
import LoadingPage from "../ui/LoadingPage.js";
import ErrorPage from "../ui/ErrorPage.js";
import type { DefaultResponse } from "../../types/default.js";


export default function UserProfileOnAdmin() {
    const { id } = usePage().props;

    const isFetched = useRef(false);
    const [user, setUser] = useState<getUserProfileResponse>();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        if (isFetched.current) return;
        isFetched.current = true;

        ;(async ()=>{
            try{
                const response = await api.get<getUserProfileResponse>(`/api/user/getuserprofileonadmin/${id}`);
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
    })

    const deleteEvent = async ()=>{
        try{
            const response = await api.get<DefaultResponse>(`/api/auth/deleteaccount/${id}`);
            const resData = response.data;

            alert(resData.message);
            router.get('/admin/user_list');
        }catch(err: unknown){
            const axiosError = err as { response?: { data?: { message?: string }; status?: number }; message?: string };
            const message = axiosError?.response?.data?.message ?? axiosError?.message ?? 'Something went wrong';
            const status = axiosError?.response?.status ?? 500;

            setError(JSON.stringify({ message, status }));
        }finally{
            setLoading(false);
        }
               
    }

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
            <AdminNavbar />
            
            <div className="p-4 pl-40 pr-40 pt-30">
                <div className="bg-[#F4F4F4] w-full p-10 rounded-xl">
                    <div className="flex items-center">
                        <img className="rounded-full h-60 w-60 object-cover aspect-square" src={UserData?.profile_photo || ProfileIcon} alt="UserIcon" />
                        <div className="flex flex-col w-full gap-8 ml-5">
                            <h1 className="text-3xl">{UserData?.nama_lengkap}</h1>
                            <h2 className="text-[#1D4ED8] text-xl">{UserData?.role}</h2>
                        </div>
                        <div className="flex w-full justify-end mr-10">
                            <button onClick={deleteEvent} className="flex items-center gap-2 bg-[#FFC7C7] p-2 rounded-xl text-[#FF5454]">Delete Account</button>
                        </div>
                    </div>
                    <div className="flex flex-col mx-5 mt-20">
                        <h1 className="text-xl">Informasi siswa</h1>
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
import { useEffect, useState, useRef, useEffectEvent } from "react";
import AdminNavbar from "../../Components/Admin/Navbar.js";
import ProfileIcon from "../../../../assets/download-removebg-preview.png"
import EditIcon from "../../../../assets/edit-svgrepo-com.png"
import { type getAdminProfileResponse } from "../../types/user.js";
import ErrorPage from "../ui/ErrorPage.js";

export default function AdminProfile() {
    const [ user, setUser ] = useState<getAdminProfileResponse>(); 
    const [ error, setError ] = useState("");
    const isFetched = useRef(false);

    useEffect(()=>{
        if (isFetched.current) return;
        isFetched.current = true;

        ;(async ()=>{
            try{
                const response = await fetch('/api/user/getadminprofile',{
                    method: 'GET',
                    credentials: 'include'
                });
    
                const resData: getAdminProfileResponse = await response.json();
    
                if(!response.ok){
                    console.log('haha')
                    throw new Error(JSON.stringify({
                        message: resData?.message,
                        status: response.status
                    }))
                }
                
                setUser(resData)
            }catch(err: unknown){
                if (err instanceof Error){
                    setError(err.message)
                    return;
                }
                setError(String(error));
            }
        })();

    })
    
    if(error){
        const errorMessage = JSON.parse(error);
        return <ErrorPage errorMessage={errorMessage} />
    }

    const AdminData = user?.admin;

    return (
        <>
            <AdminNavbar>
                <div className="w-full justify-start" />
                <div className="flex gap-2 items-center w-60 mr-7 text-white">
                    <a href="/admin/user_list" className="p-1">Users</a>
                    <a href="/admin/user_registration" className="p-1">Registration</a>
                    <a href="/admin/daily_attendance" className="p-1">Attendance</a>
                </div>
            </AdminNavbar>
            <div className="p-4 pl-40 pr-40 pt-30">
                <div className="bg-[#F4F4F4] w-full p-10 rounded-xl">
                    <div className="flex items-center">
                        <img src={ProfileIcon} alt="UserIcon" />
                        <div className="flex flex-col w-full gap-8 ml-5">
                            <h1 className="text-3xl">{AdminData?.nama_lengkap}</h1>
                            <h2 className="text-[#FF5454] text-xl">{AdminData?.role}</h2>
                        </div>
                        <div className="flex w-full justify-end mr-10">
                            <a href="" className="flex items-center gap-2 bg-[#F3E8FF] p-2 rounded-xl text-[#7C3AED]">Edit <img src={EditIcon} alt="EditIcon" width={20} /></a>
                        </div>
                    </div>
                    <div className="flex flex-col mx-5 mt-20">
                        <h1 className="text-xl">Informasi Administrator</h1>
                        <div className="flex gap-20 mt-10">
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Perusahaan</h1>
                                <h1>{AdminData?.perusahaan}</h1>
                            </div>
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Divisi</h1>
                                <h1>{AdminData?.divisi}</h1>
                            </div>
                        </div>
                        <div className="flex gap-20 mt-10">
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Email</h1>
                                <h1>{AdminData?.email}</h1>
                            </div>
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Nomor HP</h1>
                                <h1>{AdminData?.nomor_telepon}</h1>
                            </div>
                        </div>
                        <div className="flex gap-20 mt-10">
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Username</h1>
                                <h1>{AdminData?.username}</h1>
                            </div>
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">User ID</h1>
                                <h1>{AdminData?.account_id}</h1>
                            </div>
                        </div>
                        <div className="flex gap-30 mt-20 mb-10">
                            <div className="flex flex-col items-center bg-[#FFC7C7] w-full rounded-lg p-4 py-10">
                                <h1 className="text-xl text-[#FF5454]">{AdminData?.siswa_pkl}</h1>
                                <h1>Siswa PKL</h1>
                            </div>
                            <div className="flex flex-col items-center bg-[#FFC7C7] w-full rounded-lg p-4 py-10">
                                <h1 className="text-xl text-[#FF5454]">{AdminData?.sekolah_mitra}</h1>
                                <h1>Sekolah</h1>
                            </div>
                            <div className="flex flex-col items-center bg-[#FFC7C7] w-full rounded-lg p-4 py-10">
                                <h1 className="text-xl text-[#FF5454]">{AdminData?.laporan_hari_ini}</h1>
                                <h1>Laporan Hari Ini</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
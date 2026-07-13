import React , { useEffect, useRef, useState } from "react";
import Navbar from "../../Components/User/Navbar.js";
import ProfileIcon from "../../../../assets/download-removebg-preview.png";
import EditIcon from "../../../../assets/edit-svgrepo-com.png"
import { type getUserProfileResponse } from "../types/user.js";
import ErrorPage from "../ErrorPage.js";

export default function Profile() {
    const isFetched = useRef(false);
    const [user, setUser] = useState<getUserProfileResponse>();
    const [error, setError] = useState("");

    useEffect(()=>{
        if (isFetched.current) return;
        isFetched.current = true;

        ;(async ()=>{
            try{
                const response = await fetch('/api/user/getuserprofile',{
                    method: 'GET',
                    credentials: 'include'
                });

                const resData: getUserProfileResponse = await response.json(); 

                if(!response.ok){
                    throw new Error(JSON.stringify({
                        message: resData.message,
                        status: response.status
                    }));
                }
                console.log(resData)
                setUser(resData);

            }catch(err: unknown){
                if(err instanceof Error){
                    setError(err.message)
                }
            }


        })()    
    })

    if (error){
        const errMessage = JSON.parse(error);
        return <ErrorPage errorMessage={errMessage} backPath="/user_profile"/>
    }

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
                            <h1 className="text-3xl">{user?.user.nama_lengkap}</h1>
                            <h2 className="text-[#1D4ED8] text-xl">Siswa SMK</h2>
                        </div>
                        <div className="flex w-full justify-end mr-10">
                            <span className="flex items-center gap-2 bg-[#F3E8FF] p-2 rounded-xl text-[#7C3AED]">Edit <img src={EditIcon} alt="EditIcon" width={"20px"} /></span>
                        </div>
                    </div>
                    <div className="flex flex-col mx-5 mt-20">
                        <h1 className="text-xl">Informasi siswa</h1>
                        <div className="flex gap-20 mt-10">
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Sekolah</h1>
                                <h1>{user?.user.sekolah}</h1>
                            </div>
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Jurusan</h1>
                                <h1>{user?.user.jurusan}</h1>
                            </div>
                        </div>
                        <div className="flex gap-20 mt-10">
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Email</h1>
                                <h1>{user?.user.email}</h1>
                            </div>
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Nomor HP</h1>
                                <h1>{user?.user.nomor_telepon}</h1>
                            </div>
                        </div>
                        <div className="flex gap-20 mt-10">
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Username</h1>
                                <h1>{user?.user.username}</h1>
                            </div>
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">User ID</h1>
                                <h1>{user?.user.account_id}</h1>
                            </div>
                        </div>
                        <div className="flex gap-30 mt-20 mb-10">
                            <div className="flex flex-col items-center bg-[#FFC7C7] w-full rounded-lg p-4 py-10">
                                <h1 className="text-xl text-[#FF5454]">{user?.user.hadir}</h1>
                                <h1>Hadir</h1>
                            </div>
                            <div className="flex flex-col items-center bg-[#FFC7C7] w-full rounded-lg p-4 py-10">
                                <h1 className="text-xl text-[#FF5454]">{user?.user.tidak_masuk}</h1>
                                <h1>Tidak Masuk</h1>
                            </div>
                            <div className="flex flex-col items-center bg-[#FFC7C7] w-full rounded-lg p-4 py-10">
                                <h1 className="text-xl text-[#FF5454]">{user?.user.laporan}</h1>
                                <h1>Laporan</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
import Navbar from "../../Components/User/Navbar.js";
import ProfileIcon from "../../../../assets/download-removebg-preview.png";
import React from "react";
import { useForm, Link } from "@inertiajs/react";

export default function UserProfileEdit() {
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
                    <div className="flex flex-col w-full items-center">
                        <label className="group relative w-60 rounded-full overflow-hidden cursor-pointer">
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                            />
                            <img 
                                className="w-full object-cover aspect-square transition-all duration-300 group-hover:scale-105" 
                                src={ProfileIcon} 
                                alt="UserIcon"
                            />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <svg 
                                    className="h-8 w-8 text-white" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor" 
                                    stroke-width="2"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </div>
                        </label>
                        <div className="flex flex-col w-full gap-4 ml-10 mt-10">
                            <h1 className="text-2xl">Nama</h1>
                            <input type="text" className="w-150 p-1.5 bg-[#666] rounded-lg text-white" />
                        </div>
                    </div>
                    <div className="flex flex-col mx-5 mt-20">
                        <h1 className="text-xl">Informasi Siswa</h1>
                        <div className="flex gap-20 mt-10">
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Sekolah</h1>
                                <input type="text" className="w-full p-1.5 bg-[#666] rounded-lg text-white" />
                            </div>
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Jurusan</h1>
                                <input type="text" className="w-full p-1.5 bg-[#666] rounded-lg text-white" />
                            </div>
                        </div>
                        <div className="flex gap-20 mt-10">
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Email</h1>
                                <input type="text" className="w-full p-1.5 bg-[#666] rounded-lg text-white" />
                            </div>
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Nomor HP</h1>
                                <input type="text" className="w-full p-1.5 bg-[#666] rounded-lg text-white" />
                            </div>
                        </div>
                        <div className="flex gap-20 mt-10">
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Username</h1>
                                <input type="text" className="w-full p-1.5 bg-[#666] rounded-lg text-white" />
                            </div>
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Password</h1>
                                <input type="text" className="w-full p-1.5 bg-[#666] rounded-lg text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
import AdminNavbar from "../../Components/Admin/Navbar.js"
import React from "react"
import { Head, Link } from "@inertiajs/react"
import ProfileIcon from "../../../../assets/download-removebg-preview.png"

interface AdminReport {
    studentName: string;
}

export default function AdminReport({studentName} : AdminReport) {
    return (
        <>
            <Head title={`Detail Laporan - ${studentName}`}/>
            <AdminNavbar>
                <div className="flex gap-2 items-center w-60 mr-7 text-white">
                    <a href="" className="p-1">Users</a>
                    <a href="/admin/user_registration" className="p-1">Registration</a>
                    <a href="" className="bg-white text-black p-1 rounded-lg">Attendance</a>
                </div>
            </AdminNavbar>
            <div className="min-h-screen pt-28 p-4">
                <div className="max-w-[50rem] mx-auto flex flex-col gap-5">
                    <div className="flex items-center gap-3 py-2">
                        <Link href='/admin/daily_attendance' className='text-gray-700 bg-white hover:bg-gray-200 p-2 rounded-full shadow-sm'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
                            </svg>
                        </Link>
                        <h1 className="text-xl font-bold text-gray-800">Detail Laporan</h1>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <img src={ProfileIcon} alt="Profile" className="w-16 h-16 rounded-full object-cover bg-gray-100"/>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{studentName}</h2>
                            <p className="text-gray-500 text-sm mt-2">SMK Letris Indonesia 2 • RPL</p>
                            <p className="text-gray-500 text-sm">Senin, 2 Juli 2026</p>
                        </div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-green-500 text-[25px]">Absensi Masuk</h2>
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                                <span className="text-gray-500 text-base mt-3">Status</span>
                                <span className="text-gray-800 text-base">Hadir • WFH</span>
                            </div>
                            <div className="flex justify-between border-b border-gray-50 pb-2">
                                <span className="text-gray-500 text-base">Jam Masuk</span>
                                <span className="text-gray-800 text-base">7.15 AM</span>
                            </div>
                            <div className="flex justify-between">
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
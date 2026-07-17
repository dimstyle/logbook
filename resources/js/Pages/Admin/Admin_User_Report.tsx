import AdminNavbar from "../../Components/Admin/AdminNavbar.js"
import React from "react"
import { Head, Link } from "@inertiajs/react"
import ProfileIcon from "../../../../assets/download-removebg-preview.png"
import Image from "../../../../assets/image-picture-svgrepo-com.png"

interface AttendanceData{
    school: string;
    major: string;
    attendance: string;
    wfo: boolean | string;
    report: boolean | string;
    clockOut: boolean | string;
    time: string;
    date: string;
    clockOutTime: string;
}

interface AdminReportProps {
    studentName: string;
    attendanceData: AttendanceData;
}

export default function AdminReportProps({studentName, attendanceData} : AdminReportProps) {
    const {attendance, wfo, report, clockOut, time, date, school, major, clockOutTime} = attendanceData
    const ifWfoBool = wfo === true || String(wfo) === "true" || String(wfo) === "1";
    const isReportBool = String(report) === "true";
    const isClockOutBool = String(clockOut) === "true";
    const userWFO = ifWfoBool ? "WFO" : "WFH";
    const wfoBGcolor = ifWfoBool ? "#E0F2FE" : "#F3E8FF";
    const wfoTxtcolor = ifWfoBool ? "#0369A1" : "#7C3AED";

    return (
        <>
            <Head title={`Detail Laporan - ${studentName}`}/>

            <AdminNavbar />

            <div className="min-h-screen pt-28 p-4">
                <div className="max-w-200 mx-auto flex flex-col gap-5">
                    {/*Back*/}
                    <div className="flex items-center gap-3 py-2">
                        <Link href='/admin/daily_attendance' className='text-gray-700 bg-white hover:bg-gray-200 p-2 rounded-full shadow-sm'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
                            </svg>
                        </Link>
                        <h1 className="text-xl text-black">Detail Laporan</h1>
                    </div>
                    {/*Profil Siswa*/}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <img src={ProfileIcon} alt="Profile" className="w-16 h-16 rounded-full object-cover bg-gray-100"/>
                        <div>
                            <h2 className="text-2xl font-bold text-black">{studentName}</h2>
                            <p className="text-gray-500 text-sm mt-2">{school} • {major}</p>
                            <p className="text-gray-500 text-sm">{date}</p>
                        </div>
                    </div>
                    {/*Izin atau TIdak Masuk*/}
                    {(attendance === "Sakit" || attendance === "Izin" || attendance === "Belum")&&(
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-gray-500">
                            <p className="font-semibold">User data does not exist</p>
                            <p className="text-sm text-gray-400 mt-1">Student Status: <span className="font-bold text-blue-600">{attendance === "Belum" ? "Belum masuk" : attendance}</span></p>
                        </div>
                    )}
                    {/*Sudah Masuk*/}
                    {attendance === "Hadir" && (
                        <>
                            {/*Absensi Masuk*/}
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-green-500 text-[23px]">Absensi Masuk</h2>
                                <div className="flex flex-col gap-3">
                                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                    <span className="text-gray-500 text-base mt-3">Status</span>
                                    <div className="flex gap-2">
                                        <span className="text-base text-black">Hadir •</span>
                                        <span style={{backgroundColor: wfoBGcolor, color: wfoTxtcolor}} className="text-base rounded-md font-medium"> {userWFO}</span>
                                    </div>
                                </div>
                                    <div className="flex justify-between border-b border-gray-50 pb-2">
                                        <span className="text-gray-500 text-base">Jam Masuk</span>
                                        <span className="text-black text-base">{time}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-50 pb-2">
                                        <span className="text-gray-500 text-base">Lokasi</span>
                                        <span className="text-black text-base">BRIN - PUSDATIN</span>
                                    </div>
                                </div>
                            </div>
                            {/*Laporan Kegiatan*/}
                            {isReportBool && (
                                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="border-b border-gray-100 pb-3 mb-4">
                                        <h2 className="text-black text-[23px]">Laporan Kegiatan</h2>
                                    </div>
                                    <div className="mb-4">
                                        <span className="text-[16px] font-bold tracking-wider">Divisi</span>
                                        <div className="mt-2 p-3 pl-4 bg-gray-200 rounded-lg text-[15px] border border-gray-200">Software Development</div>
                                    </div>
                                    <div className="mb-4">
                                        <span className="text-[16px] font-bold tracking-wider">Kegiatan</span>
                                        <ul className="list-disc leading-relaxed space-y-2 mt-2 p-3 pl-7 bg-gray-200 rounded-lg text-[15px] border border-gray-200">
                                            <li>Membuat halaman Attendance History</li>
                                            <li>Memperbaiki validasi login</li>
                                            <li>Testing fitur laporan kegiatan</li>
                                            <li>Push project ke github</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <span className="text-[16px] font-bold tracking-wider">Dokumentasi</span>
                                        <div className="flex gap-10 mt-2">
                                            <div className="w-50 h-50 bg-gray-200 border border-dashed flex items-center border-gray-200 rounded-xl justify-center cursor-pointer hover:bg-gray-300 transition">
                                                <img src={Image} alt="" width={100} />
                                            </div>
                                            <div className="w-50 h-50 bg-gray-200 border border-dashed flex items-center border-gray-200 rounded-xl justify-center cursor-pointer hover:bg-gray-300 transition ">
                                                <img src={Image} alt="" width={100} />
                                            </div>
                                            <div className="w-50 h-50 bg-gray-200 border border-dashed flex items-center border-gray-200 rounded-xl justify-center cursor-pointer hover:bg-gray-300 transition ">
                                                <img src={Image} alt="" width={100} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/*Absensi Pulang*/}
                            {isClockOutBool && (
                                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                                    <h2 className="text-red-500 text-[23px]">Absensi Pulang</h2>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                            <span className="text-gray-500 text-base mt-3">Status</span>
                                            <span className="text-black text-base">Pulang</span>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-50 pb-2">
                                            <span className="text-gray-500 text-base">Jam Pulang</span>
                                            <span className="text-black text-base">{clockOutTime} PM</span>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-50 pb-2">
                                            <span className="text-gray-500 text-base">Lokasi</span>
                                            <span className="text-black text-base">BRIN - PUSDATIN</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                                <span className="text-[16px] font-bold tracking-wider">Divisi</span>
                                <div className="mt-2 p-3 pl-4 bg-gray-200 rounded-lg text-[15px] border border-gray-200">Software Development</div>
                            </div>
                        </>
                    )}
                    
                </div>
            </div>
        </>
    )
}
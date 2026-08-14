import AdminNavbar from "../../Components/Admin/AdminNavbar.js"
import React, { useEffect, useRef, useState } from "react"
import { Head, Link, usePage } from "@inertiajs/react"
import ProfileIcon from "../../../../assets/download-removebg-preview.png"
import api from "../../lib/axios.js"
import LoadingPage from "../ui/LoadingPage.js"
import ErrorPage from "../ui/ErrorPage.js"
import { type getAttendanceDetails } from "../../types/attendance.js"

function formatTime(time: string | undefined) {
    if(!time) return

    const hour = Number(time.split(":")[0]);  
    const period = hour < 12 ? "AM" : "PM";

    return `${time} ${period}`;
}

export default function AdminReportProps() {
    const { attendance_id } = usePage().props;

    const [attendance, setAttendance] = useState<getAttendanceDetails | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const isFetched = useRef(false);

    useEffect(()=>{
        if(isFetched.current) return;
        isFetched.current = true;

        ;(async ()=>{
            try {
                const response = await api.get<getAttendanceDetails>(`/api/attendance/getattendancedetails/${attendance_id}`);
                const resData = response.data;
                
                setAttendance(resData);

            }catch (err: unknown) {
                const axiosError = err as { response?: { data?: { message?: string }; status?: number }; message?: string };
                const message = axiosError?.response?.data?.message ?? axiosError?.message ?? 'Something went wrong';
                const status = axiosError?.response?.status ?? 500;

                setError(JSON.stringify({ message, status }));
            } finally {
                setLoading(false)
            }
        })();
    },[])

    if(loading) return <LoadingPage />

    
    if (error){
        const errorMessage = JSON.parse(error)
        return <ErrorPage errorMessage={errorMessage}  backPath="/admin/daily_attendance"/>
    }

    const AttendanceDetails = attendance?.attendance;

    const clockInTime = formatTime(AttendanceDetails?.jam_hadir);
    const clockOutTime = formatTime(AttendanceDetails?.jam_pulang);

    const wfoBGcolor = !AttendanceDetails?.wfh ? "#E0F2FE" : "#F3E8FF";
    const wfoTxtcolor = !AttendanceDetails?.wfh ? "#0369A1" : "#7C3AED";
    const profileUrl = AttendanceDetails?.profile_photo ? '/storage/'+AttendanceDetails.profile_photo : "";
    const reportImages: string[] = JSON.parse(AttendanceDetails?.images || "[]");

    return (
        <>
            <Head profile={``} title={`Detail Laporan - ${AttendanceDetails?.nama_lengkap}`}/>

            <AdminNavbar />

            <div className="min-h-screen pt-28 p-4">
                <div className="max-w-200 mx-auto flex flex-col gap-5">
                    {/*Back*/}
                    <div className="flex items-center gap-3 py-2">
                        <Link href='/admin/daily_attendance' className='bg-white hover:bg-black/5 p-2 rounded-full shadow-sm'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
                            </svg>
                        </Link>
                        <h1 className="text-xl">Detail Laporan</h1>
                    </div>
                    {/*Profil Siswa*/}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                        {profileUrl ? (
                            <img className="rounded-full w-25 ml-2 mt-3 mb-2 mr-3 object-cover aspect-square" src={profileUrl} alt="UserIcon" />
                        ) : (
                            <img className="rounded-full w-30 object-cover aspect-square" src={ProfileIcon} alt="UserIcon" />
                        )}
                        <div>
                            <h2 className="text-2xl">{AttendanceDetails?.nama_lengkap}</h2>
                            <p className="text-gray-500 text-sm mt-2">{AttendanceDetails?.sekolah} • {AttendanceDetails?.jurusan}</p>
                            <p className="text-gray-500 text-sm">{AttendanceDetails?.created_date}</p>
                        </div>
                    </div>
                    {/*Izin atau TIdak Masuk*/}
                    {!AttendanceDetails?.sudah_hadir &&(
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            {!!AttendanceDetails?.sakit && (
                                <p className="text-lg mt-1">Status : <span className="p-1 rounded-lg bg-[#F3E8FF] text-[#7E22CE]">Sakit</span></p>
                            )}
                            {!!AttendanceDetails?.izin && (
                                <p className="text-lg mt-1">Status : <span className="p-1 rounded-lg bg-[#DBEAFE] text-[#1D4ED8]">Izin</span></p>
                            )}
                            {AttendanceDetails?.keterangan ? (
                                <p className="text-md mt-1">Keterangan : <span className="text-[#505050]">{AttendanceDetails?.keterangan}</span></p>
                            ) : (
                                <p className="text-lg mt-1">Status : <span className="p-1 rounded-lg bg-[#EEEEEE] text-[#6B7280]">Belum Hadir</span></p>
                            )}
                        </div>
                    )}
                    {/*Sudah Masuk*/}
                    {(AttendanceDetails?.sudah_hadir || "")&& (
                        <>
                            {/*Absensi Masuk*/}
                            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-green-500 text-[23px]">Absensi Masuk</h2>
                                <div className="flex flex-col gap-3 mt-3">
                                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                    <span className="text-gray-500 text-base">Status</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-base">Hadir •</span>
                                        <span style={{backgroundColor: wfoBGcolor, color: wfoTxtcolor}} className="text-base p-1 rounded-md font-medium"> {AttendanceDetails?.wfh ? 'WFH' : 'WFO'}</span>
                                    </div>
                                </div>
                                    <div className="flex justify-between border-b border-gray-50 pb-2">
                                        <span className="text-gray-500 text-base">Jam Masuk</span>
                                        <span className="text-base">{clockInTime}</span>
                                    </div>
                                </div>
                            </div>
                            {/*Laporan Kegiatan*/}
                            {(AttendanceDetails?.sudah_laporan || "") && (
                                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                                    <div className="border-b border-gray-100 pb-3 mb-4">
                                        <h2 className="text-[23px]">Laporan Kegiatan</h2>
                                    </div>
                                    <div className="mb-4">
                                        <span className="text-[16px]">Kegiatan</span>
                                        <div className="list-disc leading-relaxed space-y-2 mt-2 p-3 pl-4 bg-gray-200 rounded-lg text-[15px] border border-gray-200">
                                            {AttendanceDetails?.laporan}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-[16px]">Dokumentasi</span>
                                        <div className="flex gap-10 mt-2 overflow-x-auto pb-5">
                                            {reportImages.length > 0 ? (
                                                reportImages.map(image =>
                                                    <div className="shrink-0 w-50 h-50 bg-gray-200 border border-dashed flex items-center border-gray-200 rounded-xl justify-center">
                                                        <img src={`/api/attendance/${image}`} alt="" className="w-full h-full rounded-xl"/>
                                                    </div>
                                                )) : (
                                                    <h1 className="text-[#FF5454]">Tidak ada Dokumentasi.</h1>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/*Absensi Pulang*/}
                            {(AttendanceDetails?.sudah_pulang || "") && (
                                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                                    <h2 className="text-red-500 text-[23px]">Absensi Pulang</h2>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                                            <span className="text-gray-500 text-base mt-3">Status</span>
                                            <span className="text-base">Pulang</span>
                                        </div>
                                        <div className="flex justify-between border-b border-gray-50 pb-2">
                                            <span className="text-gray-500 text-base">Jam Pulang</span>
                                            <span className="text-base">{clockOutTime} PM</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                        <span className="text-[23px]">Divisi</span>
                        <div className="mt-2 p-3 pl-4 bg-gray-200 rounded-lg text-[15px] border border-gray-200">{AttendanceDetails?.divisi}</div>
                    </div>
                </div>
            </div>
        </>
    )
}
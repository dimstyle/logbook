import AdminNavbar from "../../Components/Admin/AdminNavbar.js";
import React, { useEffect, useRef, useState, type ChangeEvent } from "react";
import ProfileIcon from "../../../../assets/download-removebg-preview.png"
import { Link } from "@inertiajs/react";
import LoadingPage from "../ui/LoadingPage.js";
import ErrorPage from "../ui/ErrorPage.js";
import api from "../../lib/axios.js";
import type { getAttendanceListResponse } from "../../types/attendance.js";

const getAttendanceStatus = (attendance: getAttendanceListResponse['attendances'][number]) => {
    if (attendance.sakit) {
        return 'Sakit';
    }

    if (attendance.izin) {
        return 'Izin';
    }

    if (attendance.sudah_hadir) {
        return 'Hadir';
    }

    return 'Belum Hadir';
};

// const getAttendanceLabel = (attendance: string) => {
//     const listStatus = ['Hadir', 'Sakit', 'Izin'];
//     return listStatus.includes(attendance) ? attendance : 'Belum Masuk'
//     switch (attendance) {
//         case 'Hadir':
//             return 'Hadir';
//         case 'Sakit':
//             return 'Sakit';
//         case 'Izin':
//             return 'Izin';
//         default:
//             return 'Belum Masuk';
//     }
// };

const dateParser = (dateString: string) =>{
    const date = new Date(dateString);
    const today = new Date();

    const isToday =
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate();

    if (isToday) {
        return 'Hari ini';
    }

    today.setDate(today.getDate() - 1);

    const isYesterday =
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate();

    if (isYesterday) {
        return 'Kemarin';
    }

    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
    });

}

export default function DailyAttendance() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [attendances, setAttendances] = useState<getAttendanceListResponse>();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const isFetched = useRef(false);

    useEffect(() => {
        if (isFetched.current) return;
        isFetched.current = true;

        (async () => {
            try {
                const response = await api.get<getAttendanceListResponse>('/api/attendance/getattendancelist');
                // const mappedUsers = (response.data.attendances ?? []).map((attendance) => ({
                //     ...attendance,
                //     name: attendance.name ?? attendance.nama_lengkap ?? 'Unknown',
                //     school: attendance.school ?? attendance.sekolah ?? '-',
                //     major: attendance.major ?? attendance.jurusan ?? '-',
                //     attendance: getAttendanceStatus(attendance),
                //     wfo: Boolean(attendance.wfh ?? false),
                //     report: Boolean(attendance.sudah_laporan ?? false),
                //     clockOut: Boolean(attendance.sudah_pulang ?? false),
                //     time: attendance.jam_hadir ?? '-',
                //     date: attendance.created_date ?? '-',
                //     clockOutTime: attendance.jam_pulang ?? '-',
                //     profile_photo: attendance.profile_photo ?? '',
                // }));
                const resData = response.data;

                setAttendances(resData);

            } catch (err: unknown) {
                const axiosError = err as { response?: { data?: { message?: string }; status?: number }; message?: string };
                const message = axiosError?.response?.data?.message ?? axiosError?.message ?? 'Something went wrong';
                const status = axiosError?.response?.status ?? 500;

                setError(JSON.stringify({ message, status }));
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchQuery(event.target.value);
    }

    const filteredUser = (attendances?.attendances ?? []).filter((attendance) => {
        const lowercaseQuery = searchQuery.toLocaleLowerCase();
        return (
            attendance.nama_lengkap?.toLocaleLowerCase().includes(lowercaseQuery)
        )
    })

    if (loading) {
        return <LoadingPage />;
    }

    if (error){
        const errorMessage = JSON.parse(error)
        return <ErrorPage errorMessage={errorMessage}  backPath="/admin/daily_attendance"/>
    }

    return (
        <>
            <AdminNavbar 
                index={3} 
                input 
                inputValue={searchQuery}
                inputplaceholder="Search Users" 
                onChangeHandler={handleSearchChange} 
            />

            <div className="flex flex-col p-4 pt-30 gap-10">
                {filteredUser.length > 0 ? (
                    filteredUser.map((attendance) => {
                        const theAttendance = getAttendanceStatus(attendance);
                        const isWFO = !attendance.wfh
                        const isReport = attendance.sudah_laporan 
                        const isClockOut = attendance.sudah_pulang;

                        const lastUpdate = new Date(attendance.updated_at).toLocaleTimeString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                        }).replace(':','.');
                        const date = dateParser(attendance.created_date);
                        
                        let userAttendance = ""
                        let attendanceBGcolor = ""
                        let attendanceTxtcolor = ""
                        let userWFO = isWFO ? "WFO" : "WFH"
                        let userReport = isReport ? "Sudah Laporan" : "Belum Laporan"
                        let userClockOut = isClockOut ? "Keluar" : "Belum Keluar"
                        let wfoBGcolor = isWFO ? "#DBEAFE" : "#F3E8FF"
                        let reportBGcolor = isReport ? "#B7FCCF" : "#EEEEEE"
                        let clockOutBGcolor = isClockOut ? "#B7FCCF" : "#EEEEEE"
                        let wfoTxtcolor = isWFO ? "#1D4ED8" : "#7E22CE"
                        let reportTxtcolor = isReport ? "#15803D" : "#6B7280"
                        let clockOutTxtcolor = isClockOut ? "#15803D" : "#6B7280"

                        if (theAttendance === "Hadir") {
                            userAttendance = theAttendance
                            attendanceBGcolor = "#B7FCCF"
                            attendanceTxtcolor = "#15803D"
                        }
                        else if (theAttendance === "Sakit") {
                            userAttendance = "Sakit"
                            userWFO = "N/A"
                            userReport = "N/A"
                            userClockOut = "N/A"
                            attendanceBGcolor = "#F3E8FF"
                            attendanceTxtcolor = "#7E22CE"
                            wfoBGcolor = "#EEEEEE"
                            wfoTxtcolor = "#6B7280"
                            reportBGcolor = "#EEEEEE"
                            reportTxtcolor = "#6B7280"
                            clockOutBGcolor = "#EEEEEE"
                            clockOutTxtcolor = "#6B7280"
                        }
                        else if (theAttendance === "Izin") {
                            userAttendance = 'Izin'
                            userWFO = "N/A"
                            userReport = "N/A"
                            userClockOut = "N/A"
                            attendanceBGcolor = "#DBEAFE"
                            attendanceTxtcolor = "#1D4ED8"
                            wfoBGcolor = "#EEEEEE"
                            wfoTxtcolor = "#6B7280"
                            reportBGcolor = "#EEEEEE"
                            reportTxtcolor = "#6B7280"
                            clockOutBGcolor = "#EEEEEE"
                            clockOutTxtcolor = "#6B7280"
                        }
                        else if (theAttendance === "Belum Hadir") {
                            userAttendance = theAttendance
                            userWFO = "N/A"
                            userReport = "N/A"
                            userClockOut = "N/A"
                            attendanceBGcolor = "#EEEEEE"
                            attendanceTxtcolor = "#6B7280"
                            wfoBGcolor = "#EEEEEE"
                            wfoTxtcolor = "#6B7280"
                            reportBGcolor = "#EEEEEE"
                            reportTxtcolor = "#6B7280"
                            clockOutBGcolor = "#EEEEEE"
                            clockOutTxtcolor = "#6B7280"
                        }

                        return (
                            <Link 
                                key={attendance.attendance_id} 
                                href={`/admin/user_report/${encodeURIComponent(attendance.nama_lengkap ?? "unknown")}`}
                                data={{
                                    school: attendance.sekolah,
                                    major: attendance.jurusan,
                                    attendance: theAttendance,
                                    wfo: isWFO,
                                    report: isReport,
                                    clockOut: isClockOut,
                                    time: lastUpdate,
                                    date: date,
                                    clockOutTime: lastUpdate,
                                }} 
                                className="flex w-full p-5 bg-[#FFFFFF] rounded-lg"
                            >
                                <img src={attendance.profile_photo || ProfileIcon} alt="UserIcon" width={130} className="rounded-full object-cover" />
                                <div className="flex flex-col w-full justify-center gap-3 ml-2">
                                    <h1 className="text-2xl">{attendance.nama_lengkap}</h1>
                                    <div className="flex gap-2">
                                        <h2>{attendance.sekolah}</h2>
                                        <h1>•</h1>
                                        <h2>{attendance.jurusan}</h2>
                                    </div>
                                    <div className="flex gap-3">
                                        <span style={{backgroundColor: attendanceBGcolor, color: attendanceTxtcolor}} className="flex justify-center items-center p-1 rounded-lg">{userAttendance}</span>
                                        <span style={{backgroundColor: wfoBGcolor, color: wfoTxtcolor}} className="flex justify-center items-center p-1 rounded-lg">{userWFO}</span>
                                        <span style={{backgroundColor: reportBGcolor, color: reportTxtcolor}} className="flex justify-center items-center p-1 rounded-lg">{userReport}</span>
                                        <span style={{backgroundColor: clockOutBGcolor, color: clockOutTxtcolor}} className="flex justify-center items-center p-1 rounded-lg">{userClockOut}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full items-end">
                                    <p className="text-[#6B7280]">{lastUpdate}</p>
                                    <p className="text-[#6B7280]">{date}</p>
                                </div>
                            </Link>
                        )
                    })
                ) : (
                    <div className="flex w-full justify-center">
                        <h1 className="text-3xl">No Users Found.</h1>
                    </div>
                )}
            </div>
        </>
    )
}
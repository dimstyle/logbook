import AdminNavbar from "../../Components/Admin/AdminNavbar.js";
import React, { useEffect, useRef, useState, type ChangeEvent } from "react";
import ProfileIcon from "../../../../assets/download-removebg-preview.png"
import { Link } from "@inertiajs/react";
import LoadingPage from "../ui/LoadingPage.js";
import ErrorPage from "../ui/ErrorPage.js";
import api from "../../lib/axios.js";
import { type getUsersAttendanceInfoResponse } from "../../types/user.js";

const getAttendanceStatus = (user: getUsersAttendanceInfoResponse['users'][number]) => {
    if (user.sakit) {
        return 'Sakit';
    }

    if (user.izin) {
        return 'Izin';
    }

    if (user.sudah_hadir) {
        return 'Hadir';
    }

    return 'Belum';
};

const getAttendanceLabel = (attendance: string) => {
    switch (attendance) {
        case 'Hadir':
            return 'Hadir';
        case 'Sakit':
            return 'Sakit';
        case 'Izin':
            return 'Izin';
        default:
            return 'Belum Masuk';
    }
};

export default function DailyAttendance() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [users, setUsers] = useState<getUsersAttendanceInfoResponse>();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const isFetched = useRef(false);

    useEffect(() => {
        if (isFetched.current) return;
        isFetched.current = true;

        (async () => {
            try {
                const response = await api.get<getUsersAttendanceInfoResponse>('/api/user/getlistusersinfo');
                const mappedUsers = (response.data.users ?? []).map((user) => ({
                    ...user,
                    name: user.name ?? user.nama_lengkap ?? 'Unknown',
                    school: user.school ?? user.sekolah ?? '-',
                    major: user.major ?? user.jurusan ?? '-',
                    attendance: getAttendanceStatus(user),
                    wfo: Boolean(user.wfh ?? false),
                    report: Boolean(user.sudah_laporan ?? false),
                    clockOut: Boolean(user.sudah_pulang ?? false),
                    time: user.jam_hadir ?? '-',
                    date: user.created_date ?? '-',
                    clockOutTime: user.jam_pulang ?? '-',
                    profile_photo: user.profile_photo ?? '',
                }));

                setUsers({
                    message: response.data.message,
                    users: mappedUsers,
                });

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

    const filteredUser = (users?.users ?? []).filter((user) => {
        const lowercaseQuery = searchQuery.toLocaleLowerCase();
        return (
            user.name?.toLocaleLowerCase().includes(lowercaseQuery) ||
            user.school?.toLocaleLowerCase().includes(lowercaseQuery) ||
            user.major?.toLocaleLowerCase().includes(lowercaseQuery)
        )
    })

    if (loading) {
        return <LoadingPage />;
    }

    if (error) {
        return <ErrorPage />;
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
                    filteredUser.map((user) => {
                        const theAttendance = user.attendance ?? 'Belum'
                        const isWFO = user.wfo ?? false
                        const isReport = user.report ?? false
                        const isClockOut = user.clockOut ?? false
                        
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
                            userAttendance = getAttendanceLabel(theAttendance)
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
                            userAttendance = getAttendanceLabel(theAttendance)
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
                        else if (theAttendance === "Belum") {
                            userAttendance = getAttendanceLabel(theAttendance)
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
                                key={user.id} 
                                href={`/admin/user_report/${encodeURIComponent(user.name ?? "unknown")}`}
                                data={{
                                    school: user.school,
                                    major: user.major,
                                    attendance: user.attendance,
                                    wfo: user.wfo,
                                    report: user.report,
                                    clockOut: user.clockOut,
                                    time: user.time,
                                    date: user.date,
                                    clockOutTime: user.clockOutTime,
                                }} 
                                className="flex w-full p-5 bg-[#FFFFFF] rounded-lg"
                            >
                                <img src={user.profile_photo || ProfileIcon} alt="UserIcon" width={130} className="rounded-full object-cover" />
                                <div className="flex flex-col w-full justify-center gap-3 ml-2">
                                    <h1 className="text-2xl">{user.name}</h1>
                                    <div className="flex gap-2">
                                        <h2>{user.school}</h2>
                                        <h1>•</h1>
                                        <h2>{user.major}</h2>
                                    </div>
                                    <div className="flex gap-3">
                                        <span style={{backgroundColor: attendanceBGcolor, color: attendanceTxtcolor}} className="flex justify-center items-center p-1 rounded-lg">{userAttendance}</span>
                                        <span style={{backgroundColor: wfoBGcolor, color: wfoTxtcolor}} className="flex justify-center items-center p-1 rounded-lg">{userWFO}</span>
                                        <span style={{backgroundColor: reportBGcolor, color: reportTxtcolor}} className="flex justify-center items-center p-1 rounded-lg">{userReport}</span>
                                        <span style={{backgroundColor: clockOutBGcolor, color: clockOutTxtcolor}} className="flex justify-center items-center p-1 rounded-lg">{userClockOut}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full items-end">
                                    <p className="text-[#6B7280]">{user.time}</p>
                                    <p className="text-[#6B7280]">{user.date}</p>
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
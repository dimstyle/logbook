import AdminNavbar from "../../Components/Admin/AdminNavbar.js";
import React, { useEffect, useRef, useState, type ChangeEvent } from "react";
import ProfileIcon from "../../../../assets/download-removebg-preview.png"
import { Link } from "@inertiajs/react";
import LoadingPage from "../ui/LoadingPage.js";
import ErrorPage from "../ui/ErrorPage.js";
import api from "../../lib/axios.js";
import type { getAttendanceListResponse } from "../../types/attendance.js";
import StatusLabel from "../../Components/Admin/StatusLabel.js";

interface  statusLabelType{
    [key: string] : colorPallateType
}

interface colorPallateType {
    fontColor: string, 
    backGroundColor: string
}

const sudahStyle = {
    fontColor: "15803D",
    backGroundColor: "B7FCCF"
}

const belumStyle = {
    fontColor: "6B7280",
    backGroundColor : "EEEEEE"
}

const colorPallate: statusLabelType  = {
    "Hadir" : sudahStyle,
    "Laporan" : sudahStyle,
    "Pulang" : sudahStyle,

    "Belum" : belumStyle,
    "N/A" : belumStyle,

    "Izin" : {
        fontColor: "1D4ED8",
        backGroundColor: "DBEAFE"
    },
    "Sakit" : {
        fontColor: "7E22CE",
        backGroundColor: "F3E8FF"
    },
    "WFO" :{
        fontColor: "0369A1",
        backGroundColor: "E0F2FE"
    },
    "WFH" : {
        fontColor: "7C3AED",
        backGroundColor: "F3E8FF"
    },
}

const getAttendanceStatus = (attendance: getAttendanceListResponse['attendances'][number])=>{
    const statusTables = [
        'N/A' , 'N/A' , 'N/A' , 'N/A'
    ]

    const hadir_status = attendance.sudah_hadir ? "Hadir" : "Belum Hadir";
    const laporan_status = attendance.sudah_laporan ? "Laporan" : "Belum Laporan";
    const pulang_status = attendance.sudah_pulang ? "Pulang" : "Belum Pulang"
    const wfh_status = attendance.wfh? 'WFH' : 'WFO';

    if(attendance.izin) {
        statusTables[0] = 'Izin'
        return statusTables
    }

    if(attendance.sakit){
        statusTables[0] = 'Sakit'
        return statusTables
    }

    if (!attendance.sudah_hadir){
        return [hadir_status, laporan_status, pulang_status];
    }

    return [hadir_status, wfh_status, laporan_status, pulang_status];
}

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

            <div className="flex flex-col p-6 pt-30 gap-10 max-w-7xl mx-auto">
                {filteredUser.length > 0 ? (
                    filteredUser.map((attendance) => {

                        const lastUpdate = new Date(attendance.updated_at).toLocaleTimeString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true
                        }).replace(':','.');

                        const date = dateParser(attendance.created_date);
                        
                        const profile_photo = attendance.profile_photo? '/storage/'+attendance.profile_photo : "";

                        return (
                            <Link 
                                key={attendance.attendance_id} 
                                href={`/admin/user_report/${attendance.attendance_id}`}
                                className="flex w-full h-40 p-5 bg-[#FFFFFF] rounded-lg"
                            >
                                {profile_photo ? (
                                    <img className="rounded-full w-25 ml-2 mt-3 mb-2 mr-3 object-cover aspect-square" src={profile_photo} alt="UserIcon" />
                                ) : (
                                    <img className="rounded-full w-30 object-cover aspect-square" src={ProfileIcon} alt="UserIcon" />
                                )}
                                <div className="flex flex-col w-full justify-center gap-3 ml-2">
                                    <h1 className="text-2xl">{attendance.nama_lengkap}</h1>
                                    <div className="flex gap-2">
                                        <h2>{attendance.sekolah}</h2>
                                        <h1>•</h1>
                                        <h2>{attendance.jurusan}</h2>
                                    </div>
                                    <div className="flex gap-3">
                                        {
                                            getAttendanceStatus(attendance).map((status: string) =>  
                                                <StatusLabel 
                                                    colorPallate={colorPallate[status.split(' ')[0]!]!} 
                                                    statusLabel={status}
                                                />
                                            )
                                        }
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
import { useEffect, useState, type ChangeEvent } from "react";
import UserNavbar from "../../Components/User/UserNavbar.js";
import api from "../../lib/axios.js";
import LoadingPage from "../ui/LoadingPage.js";
import ErrorPage from "../ui/ErrorPage.js";
import type { getAttendanceHistoryResponse } from "../../types/attendance.js";

// interface AttendanceRecord {
//     id: number;
//     activity: string;
//     clockin: string;
//     clockout: string;
//     date: string;
//     laporan: string;
// }

// const attendanceRecords = (response.data.data ?? []).map((record) => ({
//     ...record,
//     activity: record.laporan || 'Belum ada laporan',
//     clockin: record.clockin || '-',
//     clockout: record.clockout || '-',
//     date: record.date || '-',
// }));

// history.activity.toLocaleLowerCase().includes(lowercaseQuery) ||
// history.clockin.toLocaleLowerCase().includes(lowercaseQuery) ||
// history.clockout.toLocaleLowerCase().includes(lowercaseQuery) ||
// history.date.toLocaleLowerCase().includes(lowercaseQuery) ||
// history.laporan.toLocaleLowerCase().includes(lowercaseQuery)

export default function Home(){
    const [searchQuery, setSearchQuery] = useState("");
    const [records, setRecords] = useState<getAttendanceHistoryResponse>();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const response = await api.get<getAttendanceHistoryResponse>('/api/attendance/getattendancehistory');
                const resData = response.data;

            } catch (err: unknown) {
                const axiosError = err as { response?: { data?: { message?: string }; status?: number }; message?: string };
                const message = axiosError?.response?.data?.message ?? axiosError?.message ?? 'Something went wrong';
                const status = axiosError?.response?.status ?? 500;
                setError(JSON.stringify({ message, status }));
            } finally {
                setLoading(false);
            }
        };

        void loadHistory();
    }, []);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchQuery(event.target.value);
    }

    const userAttendances = records?.attendances;

    const filteredUser = (userAttendances ?? []).filter((history) => {
        const lowercaseQuery = searchQuery.toLocaleLowerCase();
        return (
            history.jam_hadir.toLocaleLowerCase().includes(lowercaseQuery) || 
            history.jam_pulang.toLocaleLowerCase().includes(lowercaseQuery) 
        )
    })

    if(loading){
        return <LoadingPage />
    }
    
    if (error){
        const errMessage = JSON.parse(error);
        return <ErrorPage errorMessage={errMessage} backPath="/"/>
    }

    console.log(filteredUser)

    const today = new Date().toISOString().slice(0, 10);

    return(
        <>
            <UserNavbar 
                index={1}
                input
                inputValue={searchQuery}
                inputplaceholder="Search Report"
                onChangeHandler={handleSearchChange}
            />
            <div className="p-4 pt-30">
                <span className="bg-[#FF5454] text-white p-2 inline-block mb-5 rounded-lg cursor-pointer">Export as PDF</span>
                <table className="min-w-full border-collapse divide-y divide-white-100 bg-[#838383] text-white">
                    <thead className="bg-[#505050]">
                        <tr className="divide-x divide-white-100">
                            <th>Activities</th>
                            <th>Clock In</th>
                            <th>Clock Out</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center divide-y divide-white-100">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="text-center text-xl items-center h-20">Loading history...</td>
                            </tr>
                        ) : filteredUser.length > 0 ? (
                            filteredUser.map((user) => {
                                const isToday = user.created_date === today;
                                const Report = user.laporan || "N/A"
                                const isExistReport = Report === "N/A"
                                const reportopc = isExistReport ? "50%" : "100%"
                                const Hadir = user.jam_hadir || "N/A"
                                const isExistHadir = Hadir === "N/A"
                                const hadiropc = isExistHadir ? "50%" : "100%"
                                const Pulang = user.jam_pulang || "N/A"
                                const isExistPulang = Pulang === "N/A"
                                const pulangopc = isExistPulang ? "50%" : "100%"
                                const Tgl = user.created_date || "N/A"
                                const isExistTgl = Tgl === "N/A"
                                const tglopc = isExistTgl ? "50%" : "100%"
                                const linktext = isToday ? "Edit" : "View";
                                const linkcolor = isToday ? "#FF5454" : "#1D4ED8";
                                const href = isToday
                                    ? `/edit_report/${user.id}`
                                    : `/view_report/${user.id}`;

                                return (
                                    <tr key={user.id} className="divide-x divide-white-100 h-20">
                                        <td style={{opacity: reportopc}} className="w-150">{user.laporan || "N/A"}</td>
                                        <td style={{opacity: hadiropc}}>{user.jam_hadir || "N/A"}</td>
                                        <td style={{opacity: pulangopc}}>{user.jam_pulang || "N/A"}</td>
                                        <td style={{opacity: tglopc}}>{user.created_date || "N/A"}</td>
                                        <td>
                                            <a href={href} style={{backgroundColor: linkcolor}} className="rounded-lg p-1.5 cursor-pointer">{linktext}</a>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center text-xl items-center h-20">No History Found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}
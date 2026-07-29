import { useEffect, useState, type ChangeEvent } from "react";
import UserNavbar from "../../Components/User/UserNavbar.js";
import api from "../../lib/axios.js";
import LoadingPage from "../ui/LoadingPage.js";
import ErrorPage from "../ui/ErrorPage.js";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReportPDF } from "./Report_PDF.js";
import type { getAttendanceHistoryResponse } from "../../types/attendance.js";

function formatTime(time: string) {
    if(!time) return

    const hour = Number(time.split(":")[0]);  
    const period = hour < 12 ? "AM" : "PM";

    return `${time} ${period}`;
}

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
                setRecords(resData);

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

    const filteredReport = (userAttendances ?? []).filter((history) => {
        const lowercaseQuery = searchQuery.toLocaleLowerCase();

        const dateFormatted = history.created_date
            ? new Date(history.created_date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }).toLowerCase()
            :'';
        return (
            history.laporan.toLocaleLowerCase().includes(lowercaseQuery)||
            dateFormatted.includes(lowercaseQuery) ||
            history.created_date.includes(lowercaseQuery)
        )
    })

    if(loading){
        return <LoadingPage />
    }
    
    if (error){
        const errMessage = JSON.parse(error);
        return <ErrorPage errorMessage={errMessage} backPath="/"/>
    }

    const today = new Date().toISOString().slice(0, 10);
    const currentUser = records?.user;

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
                <PDFDownloadLink
                    document={<ReportPDF
                                data={filteredReport}
                                userProfile={{
                                    name: currentUser?.nama_lengkap || "N/A",
                                    school: currentUser?.sekolah || "N/A",
                                    major: currentUser?.jurusan || "N/A"
                                    }}
                                />}
                    fileName={`Logbook_Report_${today}.pdf`}
                    className="bg-[#FF5454] text-white p-2 inline-block mb-5 rounded-lg cursor-pointer"
                >
                    Export as PDF
                </PDFDownloadLink>
                <table className="min-w-full border-collapse divide-y divide-white-100 bg-[#838383] text-white">
                    <thead className="bg-[#505050]">
                        <tr className="divide-x divide-white-100">
                            <th  className="w-150">Activities</th>
                            <th  className="w-50">Clock In</th>
                            <th  className="w-50">Clock Out</th>
                            <th  className="w-50">Date</th>
                            <th  className="w-40">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center divide-y divide-white-100">
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="text-center text-xl items-center h-20">Loading history...</td>
                            </tr>
                        ) : filteredReport.length > 0 ? (
                            filteredReport.map((user) => {
                                const isToday = user.created_date === today;
                                const linktext = isToday ? "Edit" : "View";
                                const linkcolor = isToday ? "#FF5454" : "#1D4ED8";

                                const date = (new Date(user.created_date)).toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                });

                                const href = isToday
                                    ? `/edit_report/${user.id}`
                                    : `/view_report/${user.id}`;

                                return (
                                    <tr key={user.id} className="divide-x divide-white-100 h-20">
                                        <td style={{opacity: user.laporan ? 1 : 0.5}}>{user.laporan || "N/A"}</td>
                                        <td style={{opacity: user.jam_hadir ? 1 : 0.5}}>{formatTime(user.jam_hadir) || "N/A"}</td>
                                        <td style={{opacity: user.jam_pulang ? 1 : 0.5}}>{formatTime(user.jam_pulang) || "N/A"}</td>
                                        <td style={{opacity: user.created_date ? 1 : 0.5}}>{date || "N/A"}</td>
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
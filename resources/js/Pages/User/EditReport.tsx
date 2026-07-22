import { router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import UserNavbar from "../../Components/User/UserNavbar.js";
import LoadingPage from "../ui/LoadingPage.js";
import ErrorPage from "../ui/ErrorPage.js";
import Plus from "../../../../assets/plus.png";
import api from "../../lib/axios.js";
import type { getAttendanceDailyResponse } from "../../types/attendance.js";

export default function EditReport() {
    const { attendance_id } = usePage().props;
    
    // const [attendanceId, setAttendanceId] = useState<number | null>(null);
    const [reportText, setReportText] = useState("");
    const [clockIn, setClockIn] = useState("-");
    const [clockOut, setClockOut] = useState("-");
    const [date, setDate] = useState("");
    const [canEditReport, setCanEditReport] = useState(false);
    const [canEditClockIn, setCanEditClockIn] = useState(false);
    const [canEditClockOut, setCanEditClockOut] = useState(false);
    const [canEditDate, setCanEditDate] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     const params = new URLSearchParams(window.location.search);
    //     const id = Number(params.get("attendance_id"));

    //     if (!Number.isNaN(id)) {
    //         setAttendanceId(id);
    //     }
    // }, []);

    useEffect(() => {
        // if (!attendanceId) {
        //     return;
        // }

        const loadRecord = async () => {
            try {
                const response = await api.get<getAttendanceDailyResponse>(`/api/attendance/getattendancedaily?attendance_id=${attendance_id}`);
                const record = response.data;

                if (record) {
                    setReportText(record.laporan ?? "");
                    setClockIn(record.jam_hadir || "-");
                    setClockOut(record.jam_pulang || "-");
                    setDate(record.created_date || "");
                    setCanEditReport(Boolean(record.laporan && record.laporan.trim().length > 0));
                    setCanEditClockIn(Boolean(record.jam_hadir && record.jam_hadir.trim().length > 0));
                    setCanEditClockOut(Boolean(record.jam_pulang && record.jam_pulang.trim().length > 0));
                    setCanEditDate(Boolean(record.created_date && record.created_date.trim().length > 0));
                }
            } catch (err: unknown) {
                const axiosError = err as { response?: { data?: { message?: string }; status?: number }; message?: string };
                const message = axiosError?.response?.data?.message ?? axiosError?.message ?? 'Something went wrong';
                const status = axiosError?.response?.status ?? 500;
                setError(JSON.stringify({ message, status }));
            } finally {
                setLoading(false);
            }
        };

        void loadRecord();
    }, []);

    const handleSave = async () => {
        // if (!attendanceId) {
        //     return;
        // }

        try {
            await api.post('/api/attendance/update-report', {
                attendance_id: attendance_id,
                laporan: reportText,
            });

            router.visit('/');
        } catch (error) {
            console.error('Failed to update report', error);
        }
    };
    
    if(loading){
        return <LoadingPage />
    }
        
    if (error){
        const errMessage = JSON.parse(error);
        return <ErrorPage errorMessage={errMessage} backPath="/"/>
    }

    return (
        <>
            <UserNavbar />

            <div className="flex flex-col items-center">
                <span className="p-4 pt-28 mb-0 flex justify-center">
                    <h1 className="text-2xl mt-0 text-[#414141]">Edit Report</h1>
                </span>
                <span className="text-sm w-139.75">
                    <h2 className="text-[15px] text-[#414141]">Kegiatan</h2>
                    <textarea
                        value={reportText}
                        onChange={(event) => setReportText(event.target.value)}
                        className="flex-start bg-white rounded-md w-full h-28 justify-start mt-2 border-gray-300 px-4 py-3 items-start focus:ring-2 focus:border-blue-500 outline-none disabled:cursor-not-allowed"
                        placeholder={canEditReport ? "Tuliskan Kegiatan Anda" : "Belum ada laporan untuk diedit"}
                        disabled={loading || !canEditReport}
                    />
                </span>
                <span className="text-sm m-4 w-139.75">
                    <h2 className="text-[15px] mt-4 text-[#414141]">Jam Masuk</h2>
                    <input
                        type="time"
                        className="w-full p-2 rounded-md bg-gray-100"
                        value={clockIn}
                        onChange={(event) => setClockIn(event.target.value)}
                        readOnly={!canEditClockIn}
                    />
                </span>
                <span className="text-sm m-4 w-139.75">
                    <h2 className="text-[15px] mt-4 text-[#414141]">Jam Pulang</h2>
                    <input
                        type="time"
                        className="w-full p-2 rounded-md bg-gray-100"
                        value={clockOut}
                        onChange={(event) => setClockOut(event.target.value)}
                        readOnly={!canEditClockOut}
                    />
                </span>
                <span className="text-sm m-4 w-139.75">
                    <h2 className="text-[15px] mt-4 text-[#414141]">Tanggal</h2>
                    <input
                        type="date"
                        className="w-full p-2 rounded-md bg-gray-100"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        readOnly={!canEditDate}
                    />
                </span>
                <span className="text-sm m-4 w-139.75">
                    <h2 className="text-[15px] mt-4 text-[#414141]">Dokumentasi</h2>
                    <label htmlFor="file-upload" className="bg-white w-50 h-50 rounded-lg mt-2 border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors cursor-pointer">
                        <input type="file" className="hidden" id="file-upload"/>
                        <img src={Plus} className="w-12 h-12"/>
                    </label>
                </span>
                <div className="flex justify-center mt-5 mb-10">
                    <button onClick={handleSave} className="flex justify-center items-center bg-[#FF5454] w-30 h-8 rounded-lg p-1.5 cursor-pointer text-white disabled:cursor-not-allowed disabled:opacity-60">Done</button>
                </div>
            </div>
        </>
    );
};
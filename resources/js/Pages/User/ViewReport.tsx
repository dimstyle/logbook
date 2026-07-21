import { useEffect, useState } from "react";
import UserNavbar from "../../Components/User/UserNavbar.js";
import Image from "../../../../assets/image-picture-svgrepo-com.png";
import LoadingPage from "../ui/LoadingPage.js";
import ErrorPage from "../ui/ErrorPage.js";
import api from "../../lib/axios.js";

interface AttendanceRecord {
    id: number;
    date: string;
    clockin: string;
    clockout: string;
    laporan: string;
}

export default function ViewReport() {
    const [record, setRecord] = useState<AttendanceRecord | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const attendanceId = Number(params.get("attendance_id"));

        if (!Number.isNaN(attendanceId)) {
            const loadRecord = async () => {
                try {
                    const response = await api.get<{ data: AttendanceRecord[] }>('/api/attendance/history');
                    const currentRecord = response.data.data?.find((item) => item.id === attendanceId);
                    setRecord(currentRecord ?? null);
                } catch (err: unknown) {
                    const axiosError = err as { response?: { data?: { message?: string }; status?: number }; message?: string };
                    const message = axiosError?.response?.data?.message ?? axiosError?.message ?? 'Something went wrong';
                    const status = axiosError?.response?.status ?? 500;
                    setError(JSON.stringify({ message, status }));
                }
            };

            void loadRecord();
        }
    }, []);

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
            
            <div className="flex flex-col items-center p-4 pt-30 w-full">
                <h1 className="text-2xl">View Report</h1>
                <div className="flex flex-col w-170 gap-5">
                    <h2 className="mt-10">Kegiatan</h2>
                    <input type="text" value={record?.laporan ?? ""} className="w-full h-28 p-1.5 bg-[#838383] rounded-lg cursor-not-allowed" disabled/>
                    <h2>Jam Masuk</h2>
                    <input type="text" value={record?.clockin ?? "-"} className="w-full p-1.5 bg-[#838383] rounded-lg cursor-not-allowed" disabled/>
                    <h2>Jam Pulang</h2>
                    <input type="text" value={record?.clockout ?? "-"} className="w-full p-1.5 bg-[#838383] rounded-lg cursor-not-allowed" disabled/>
                    <h2>Tanggal</h2>
                    <input type="text" value={record?.date ?? ""} className="w-50 p-1.5 bg-[#838383] rounded-lg cursor-not-allowed" disabled/>
                    <h2>Dokumentasi</h2>
                    <span className="flex justify-center items-center bg-[#838383] w-50 h-50 rounded-lg cursor-not-allowed">
                        <img src={Image} alt="" width={100}/>
                    </span>
                    <div className="flex justify-center mt-5 mb-10">
                        <a href="/" className="flex justify-center items-center bg-[#FF5454] w-30 h-8 rounded-lg p-1.5 cursor-pointer text-white ">Done</a>
                    </div>
                </div>
            </div>
        </>
    )
}
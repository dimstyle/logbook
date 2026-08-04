import { useEffect, useRef, useState } from "react";
import UserNavbar from "../../Components/User/UserNavbar.js";
import LoadingPage from "../ui/LoadingPage.js";
import ErrorPage from "../ui/ErrorPage.js";
import api from "../../lib/axios.js";
import type { getAttendanceDailyResponse } from "../../types/attendance.js";
import { usePage } from "@inertiajs/react";

export default function ViewReport() {
    const { attendance_id } = usePage().props;

    const isFetched = useRef(false);

    const [attendance, setAttendance] = useState<getAttendanceDailyResponse>();
    const [reportImages, setReportImages] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(isFetched.current) return;
        isFetched.current = true;

        ;(async () => {
            try {
                const response = await api.get<getAttendanceDailyResponse>(`/api/attendance/getattendancedaily?attendance_id=${attendance_id}`);
                const resData = response.data;
                const record = resData?.attendance;

                setAttendance(resData);

                if (record?.images) {
                    try {
                        const parsedImages = JSON.parse(record.images);
                        setReportImages(Array.isArray(parsedImages) ? parsedImages : []);
                    } catch {
                        setReportImages([]);
                    }
                }
            } catch (err: unknown) {
                const axiosError = err as { response?: { data?: { message?: string }; status?: number }; message?: string };
                const message = axiosError?.response?.data?.message ?? axiosError?.message ?? 'Something went wrong';
                const status = axiosError?.response?.status ?? 500;
                setError(JSON.stringify({ message, status }));
            }finally{
                setLoading(false);
            }
        })();
    }, []);

    if(loading){
        return <LoadingPage />
    }
            
    if (error){
        const errMessage = JSON.parse(error);
        return <ErrorPage errorMessage={errMessage} backPath="/"/>
    }
    
    const record = attendance?.attendance;
    return (
        <>
            <UserNavbar />
            
            <div className="flex flex-col items-center p-4 pt-30 w-full">
                <h1 className="text-2xl">View Report</h1>
                <div className="flex flex-col w-170 gap-5">
                    <h2 className="mt-10">Kegiatan</h2>
                    <textarea value={record?.laporan ?? ""} className="flex-start justify-start w-full h-28 p-1.5 items-start bg-[#838383] rounded-lg outline-none cursor-not-allowed" disabled/>
                    <h2>Jam Masuk</h2>
                    <input type="text" value={record?.jam_hadir ?? "-"} className="w-50 p-1.5 bg-[#838383] rounded-lg cursor-not-allowed" disabled/>
                    <h2>Jam Pulang</h2>
                    <input type="text" value={record?.jam_pulang ?? "-"} className="w-50 p-1.5 bg-[#838383] rounded-lg cursor-not-allowed" disabled/>
                    <h2>Tanggal</h2>
                    <input type="text" value={record?.created_date ?? ""} className="w-50 p-1.5 bg-[#838383] rounded-lg cursor-not-allowed" disabled/>
                    <h2>Dokumentasi</h2>
                    <div className="flex gap-3 overflow-x-auto pb-5">
                        {reportImages.length > 0 ? (
                            reportImages.map((image, index) => {
                                const url = image
                                    ? !image.includes("blob")
                                        ? `/api/attendance/${image}`
                                        : image
                                    : "";

                                return (
                                    <div key={index} className="shrink-0 bg-white w-50 h-50 rounded-xl mt-2 border-2 border-gray-300 flex items-center justify-center">
                                        <img src={url} alt={`Dokumentasi ${index + 1}`} className="w-full h-full rounded-xl" />
                                    </div>
                                );
                            })
                        ) : (
                            <h1>Tidak ada Dokumentasi.</h1>
                        )}
                    </div>
                    <div className="flex justify-center mt-5 mb-10">
                        <a href="/" className="flex justify-center items-center bg-[#FF5454] w-30 h-8 rounded-lg p-1.5 cursor-pointer text-white ">Done</a>
                    </div>
                </div>
            </div>
        </>
    )
}
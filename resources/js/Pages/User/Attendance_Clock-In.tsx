import { router, usePage } from "@inertiajs/react";
import UserNavbar from "../../Components/User/UserNavbar.js";
import { useEffect, useState } from "react";
import ErrorPage from "../ui/ErrorPage.js";
import api from "../../lib/axios.js";
import { Play } from "lucide-react";
import type { DefaultResponse } from "../../types/default.js";

function isClockIn(status: string): boolean{
    return status === 'wfh' || status === 'wfo';
}

export default function ClockIn() {
    const { izin, sakit, sudah_hadir } = usePage().props;
    const [error, setError] = useState("");
    const [now, setNow] = useState(new Date());
    const [attendance, setAttendance] = useState("");
    const [reason, setReason] = useState("");
    
    
    
    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const currentDate = now.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const currentTime =
    now.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
    });
    


    const submitEvent = async () => {
        const payload = {   
            status: attendance,
            jam_hadir : currentTime.replace('.',':'),
            alasan: reason,
        }
        
        if(!isClockIn(attendance)){
            
        }


        try{
            const response = await api.post('/api/attendance/createcheckin', payload);
            const resdata = response.data;
            
            alert(resdata.message);
            
            // router.get('/report');
        }catch(err: unknown){
            const axiosError = err as { response?: { data?: DefaultResponse; status?: number }; message?: string };
            const message = axiosError?.response?.data?.message ?? axiosError?.message ?? 'Something went wrong';
            const status = axiosError?.response?.status ?? 500;
            setError(JSON.stringify({ message, status }));
        }

        
    };


    const isPermission = attendance === "izin" || attendance === "sakit";
    
    if (sudah_hadir) router.get("/report");
    
    if (error) {
        const errorMessage = JSON.parse(error);
        return <ErrorPage errorMessage={errorMessage} backPath="/clock-in" />
    }

    return (
        <>
            <UserNavbar index={2} />

            <div className="flex justify-center items-center min-h-screen bg-[#ECE9E9] px-4 pt-24 pb-10">
                <div className="w-full max-w-2xl bg-[#C0BDBD] rounded-2xl shadow-xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-semibold text-[#560000]">
                            Absen Masuk
                        </h1>
                    </div>

                    {/* Live Date & Time */}
                    <div className="grid grid-cols-2 gap-5 mb-8">
                        <div
                            className={`rounded-xl border p-5 transition ${
                                isPermission
                                    ? "bg-[#D6D6D6] border-[#B3B3B3] text-gray-500"
                                    : "bg-white border-[#A9A6A6]"
                            }`}
                        >
                            <p className="text-sm text-gray-500">Tanggal</p>

                            <h2 className="text-lg font-semibold text-[#560000] mt-2">
                                {currentDate}
                            </h2>
                        </div>

                        <div
                            className={`rounded-xl border p-5 transition ${
                                isPermission
                                    ? "bg-[#D6D6D6] border-[#B3B3B3] text-gray-500"
                                    : "bg-white border-[#A9A6A6]"
                            }`}
                        >
                            <p className="text-sm text-gray-500">
                                Jam Sekarang
                            </p>

                            <h2 className="text-3xl font-bold text-[#FF5454] mt-2">
                                {currentTime} WIB
                            </h2>
                        </div>
                    </div>

                    {/* Attendance */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-[#560000] mb-4">
                            Status Kehadiran
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <label
                                className={`rounded-xl border p-4 flex items-center gap-3 cursor-pointer transition-all duration-200 ${
                                    attendance === "wfo"
                                        ? "bg-[#FFD6D6] border-[#FF5454]"
                                        : "bg-white border-[#A9A6A6] hover:border-[#FF5454]"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="attendance"
                                    value="wfo"
                                    checked={attendance === "wfo"}
                                    onChange={(e) => {
                                        setAttendance(e.target.value);
                                        setReason("");
                                    }}
                                    className="accent-[#FF5454]"
                                />

                                <span className="font-medium">WFO</span>
                            </label>

                            <label
                                className={`rounded-xl border p-4 flex items-center gap-3 cursor-pointer transition-all duration-200 ${
                                    attendance === "wfh"
                                        ? "bg-[#FFD6D6] border-[#FF5454]"
                                        : "bg-white border-[#A9A6A6] hover:border-[#FF5454]"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="attendance"
                                    value="wfh"
                                    checked={attendance === "wfh"}
                                    onChange={(e) => {
                                        setAttendance(e.target.value);
                                        setReason("");
                                    }}
                                    className="accent-[#FF5454]"
                                />

                                <span className="font-medium">WFH</span>
                            </label>

                            <label
                                className={`rounded-xl border p-4 flex items-center gap-3 cursor-pointer transition-all duration-200 ${
                                    attendance === "izin"
                                        ? "bg-[#FFD6D6] border-[#FF5454]"
                                        : "bg-white border-[#A9A6A6] hover:border-[#FF5454]"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="attendance"
                                    value="izin"
                                    checked={attendance === "izin"}
                                    onChange={(e) =>
                                        setAttendance(e.target.value)
                                    }
                                    className="accent-[#FF5454]"
                                />

                                <span className="font-medium">Izin</span>
                            </label>

                            <label
                                className={`rounded-xl border p-4 flex items-center gap-3 cursor-pointer transition-all duration-200 ${
                                    attendance === "sakit"
                                        ? "bg-[#FFD6D6] border-[#FF5454]"
                                        : "bg-white border-[#A9A6A6] hover:border-[#FF5454]"
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="attendance"
                                    value="sakit"
                                    checked={attendance === "sakit"}
                                    onChange={(e) =>
                                        setAttendance(e.target.value)
                                    }
                                    className="accent-[#FF5454]"
                                />

                                <span className="font-medium">Sakit</span>
                            </label>
                        </div>
                    </div>

                    {/* Reason */}
                    {isPermission && (
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-[#560000] mb-3">
                                Alasan {attendance}
                            </h2>

                            <textarea
                                rows={5}
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder={`Masukkan alasan ${attendance}...`}
                                className="w-full rounded-xl border border-[#A9A6A6] bg-white p-4 resize-none
                focus:outline-none
                focus:ring-2
                focus:ring-[#FF5454]
                focus:border-[#FF5454]"
                            />
                        </div>
                    )}

                    {/* Submit */}
                    <div className="flex justify-center">
                        <button
                            onClick={submitEvent}
                            className="bg-[#FF5454]
              hover:bg-[#E54747]
              text-white
              font-semibold
              px-10
              py-3
              rounded-xl
              shadow-lg
              transition-all
              duration-200
              hover:scale-105
              cursor-pointer"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

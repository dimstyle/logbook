import { router, usePage } from "@inertiajs/react";
import UserNavbar from "../../Components/User/UserNavbar.js";
import ErrorPage from "../ui/ErrorPage.js";
import api from "../../lib/axios.js";
import { useEffect, useState } from "react";
import type { DefaultResponse } from "../../types/default.js";

export default function ClockOut() {
    const { izin, sakit, sudah_pulang, sudah_laporan } = usePage().props;
    const [error, setError] = useState("");
    const [now, setNow] = useState(new Date());

    if(sudah_pulang) {
        router.get('/done')
        return
    }

    if(!sudah_laporan) {
        router.get('/report')
        return
    }

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
        hour12: true
    });
    


    const submitEvent = async () => {
        const payload = {   
            jam_pulang : currentTime.replace('.',':').split(' ')[0],
        }
        
        try{
            const response = await api.post('/api/attendance/createcheckout', payload);
            const resdata = response.data;
            
            alert(resdata.message);
            router.get('/done');
        }catch(err: unknown){
            const axiosError = err as { response?: { data?: DefaultResponse; status?: number }; message?: string };
            const message = axiosError?.response?.data?.message ?? axiosError?.message ?? 'Something went wrong';
            const status = axiosError?.response?.status ?? 500;
            setError(JSON.stringify({ message, status }));
        }
        
    };
    
    if (error) {
        const errorMessage = JSON.parse(error);
        return <ErrorPage errorMessage={errorMessage} backPath="/clock-out" />
    }

    return (
        <>
            <UserNavbar index={2} />

            <div className="flex justify-center items-center min-h-screen bg-[#ECE9E9] px-4 pt-24 pb-10">
                <div className="w-full max-w-2xl bg-[#C0BDBD] rounded-2xl shadow-xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-semibold">
                            Absen Pulang
                        </h1>
                    </div>

                    {/* Live Date & Time */}
                    <div className="grid grid-cols-2 gap-5 mb-8">
                        <div
                            className="rounded-xl border p-5 transition bg-[#D6D6D6] border-[#B3B3B3]">
                            <p className="text-sm">Tanggal</p>

                            <h2 className="text-lg font-semibold text-[#560000] mt-2">
                                {currentDate}
                            </h2>
                        </div>

                        <div
                            className="rounded-xl border p-5 transition bg-[#D6D6D6] border-[#B3B3B3]">
                            <p className="text-sm">
                                Jam Sekarang
                            </p>

                            <h2 className="text-3xl font-bold text-[#FF5454] mt-2">
                                {currentTime}
                            </h2>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="flex justify-center">
                        <button
                            onClick={submitEvent}
                            className="bg-[#FF5454]
                            hover:bg-[#E54747]
                            flex
                            items-center
                            justify-center
                            text-white
                            w-30
                            h-8
                            p-1.5
                            rounded-lg
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
    )
}
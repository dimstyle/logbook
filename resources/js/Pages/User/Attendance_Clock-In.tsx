import { router, usePage } from "@inertiajs/react"
import UserNavbar from "../../Components/User/UserNavbar.js"

export default function ClockIn() {
    const { izin, sakit, sudah_hadir } = usePage().props;

    const submitEvent = ()=>{
        router.get('/report')
    }

    return (
        <>
            <UserNavbar index={2}/>
            
            <div className="flex flex-col items-center p-4 pt-30 w-full">
                <h1 className="text-2xl">Attendance Clock-In</h1>
                <div className="flex flex-col w-170 gap-5">
                    <h2 className="mt-10">Nama Lengkap</h2>
                    <input type="text" className="w-full p-1.5 bg-white rounded-lg" />
                    <h2>Asal Sekolah</h2>
                    <input type="text" className="w-full p-1.5 bg-white rounded-lg" />
                    <h2>Jurusan/Fakultas</h2>
                    <input type="text" className="w-full p-1.5 bg-white rounded-lg" />
                    <h2>Tanggal</h2>
                    <input type="date" className="w-50 p-1.5 bg-white rounded-lg" />
                    <h2>Jam Masuk</h2>
                    <input type="time" className="w-50 p-1.5 bg-white rounded-lg" />
                    <h2>Kehadiran</h2>
                    <div className="flex align-start gap-5">
                        <input type="radio" value={"wfh"} name="attendance" className="w-5 accent-[#FF5454]" />
                        <label htmlFor="wfh">WFH</label><br />
                        <input type="radio" value={"wfo"} name="attendance" className="w-5 accent-[#FF5454]" />
                        <label htmlFor="wfo">WFO</label><br />
                    </div>
                    <div className="flex justify-center mt-5 mb-10">
                        <button onClick={submitEvent} className="flex justify-center items-center bg-[#FF5454] w-30 h-8 rounded-lg p-1.5 cursor-pointer text-white ">Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}
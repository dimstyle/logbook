import UserNavbar from "../../Components/User/UserNavbar.js";

export default function ClockOut() {
    return (
        <div className="h-full">
            <UserNavbar index={2} />
        
            <div className="flex flex-col items-center p-4 pt-30 w-full">
                <h1 className="text-2xl">Attendance Clock-Out</h1>
                <div className="flex flex-col w-170 gap-5">
                    <h2 className="mt-10">Nama Lengkap</h2>
                    <input type="text" className="w-full p-1.5 bg-white rounded-lg" />
                    <h2>Asal Sekolah</h2>
                    <input type="text" className="w-full p-1.5 bg-white rounded-lg" />
                    <h2>Jurusan/Fakultas</h2>
                    <input type="text" className="w-full p-1.5 bg-white rounded-lg" />
                    <h2>Tanggal</h2>
                    <input type="date" className="w-50 p-1.5 bg-white rounded-lg" />
                    <h2>Jam Pulang</h2>
                    <input type="time" className="w-50 p-1.5 bg-white rounded-lg" />
                    <div className="flex justify-center mt-5 mb-10">
                        <a href="/" className="flex justify-center items-center bg-[#FF5454] w-30 h-8 rounded-lg p-1.5 cursor-pointer text-white ">Submit</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
import Navbar from "../../Components/User/Navbar.js";

export default function ClockOut() {
    return (
        <div>
            <Navbar>
                <div className="w-full justify-start" />
                <div className="flex gap-2 items-center w-60 mr-2 text-white">
                    <a href="/" className="p-1">History</a>
                    <a href="" className="bg-white text-black p-1 rounded-lg">Attendance</a>
                    <a href="/login" className="p-1">Logout</a>
                </div>
            </Navbar>
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
                    <h2>Jam Masuk</h2>
                    <input type="time" className="w-50 p-1.5 bg-white rounded-lg" />
                    <div className="flex justify-center mt-5">
                        <a href="/report" className="flex justify-center items-center bg-[#FF5454] w-20 rounded-lg p-1.5 cursor-pointer text-white ">Submit</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
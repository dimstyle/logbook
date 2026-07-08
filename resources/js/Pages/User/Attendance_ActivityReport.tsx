import Navbar from "../../Components/User/Navbar.js";
import Plus from "../../../../assets/plus.png"

const Attendance_ActivityReport = () => {
    return (
        <div className="h-screen">
            <Navbar>
                <input className="w-70 p-1.5 bg-white rounded-lg" type="text" placeholder="Search Reports" />
                <div className="flex justify-between items-center w-60 mr-2 text-white">
                    <a href="/" className="p-1">History</a>
                    <a href="" className="bg-white text-black p-1 rounded-lg">Attendance</a>
                    <a href="/login" className="p-1">Logout</a>
                </div>
            </Navbar>
            <div className="flex flex-col p-4 pt-30 w-full items-center ">
                <h1 className="text-2xl">Attendance Activity Report</h1>
                <div className="flex w-170 flex-col gap-4">
                    <h2 className="mt-10">Nama Lengkap</h2>
                    <input type="text" className="bg-white rounded-lg p-1.5 w-full"/>
                    <h2 className="mt-5">Asal Sekolah</h2>
                    <input type="text" className="bg-white rounded-lg p-1.5 w-full"/>
                    <h2 className="mt-5">Jurusan/Fakultas</h2>
                    <input type="text" className="bg-white rounded-lg p-1.5 w-full"/>
                    <h2 className="mt-5">Kegiatan</h2>
                    <input type="text" className="bg-white rounded-lg p-1.5 w-full"/>
                    <h2 className="mt-5">Dokumentasi</h2>
                    <div className="bg-white w-[190px] h-[190px] rounded-[29px] mt-2 border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors cursor-pointer">
                        <input type="file" className="hidden" id="file-upload"/>
                        <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
                            <img src={Plus} className="w-12 h12" />
                            <span className="text-sm text-gray-500 mt-2">Upload File</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="p-4 pt-5">
                <div className="justify-center flex mt-5 mb-10">
                    <a href="/" className="flex justify-center items-center bg-[#FF5454] w-[130px] h-[32] rounded-lg p-1.5 cursor-pointer text-white ">Submit</a>
                </div>
            </div>
        </div>
    )
}

export default Attendance_ActivityReport;
import UserNavbar from "../../Components/User/UserNavbar.js";
import Plus from "../../../../assets/plus.png"

export default function ActivityReport() {
    return (
        <div className="h-screen">
            
            <UserNavbar index={2} />

            <div className="flex flex-col p-4 pt-30 w-full items-center ">
                <h1 className="text-2xl">Attendance Activity Report</h1>
                <div className="flex w-170 flex-col gap-5">
                    <h2 className="mt-10">Nama Lengkap</h2>
                    <input type="text" className="bg-white rounded-lg p-1.5 w-full"/>
                    <h2>Asal Sekolah</h2>
                    <input type="text" className="bg-white rounded-lg p-1.5 w-full"/>
                    <h2>Jurusan/Fakultas</h2>
                    <input type="text" className="bg-white rounded-lg p-1.5 w-full"/>
                    <h2>Kegiatan</h2>
                    <input type="text" className="bg-white rounded-lg p-1.5 w-full"/>
                    <h2>Dokumentasi</h2>
                    <label htmlFor="file-upload" className="bg-white w-47.5 h-47.5 rounded-[29px] mt-2 border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors cursor-pointer">
                        <input type="file" className="hidden" id="file-upload"/>
                        <img src={Plus} className="w-12 h12" />
                    </label>
                </div>
            </div>
            <div className="p-4 pt-5">
                <div className="justify-center flex mt-5 mb-10">
                    <a href="/clock-out" className="flex justify-center items-center bg-[#FF5454] w-30 h-8 rounded-lg p-1.5 cursor-pointer text-white ">Submit</a>
                </div>
            </div>
        </div>
    )
}
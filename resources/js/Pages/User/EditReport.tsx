import Navbar from "../../Components/User/Navbar.js";
import Plus from "../../../../assets/plus.png"

export default function EditReport() {
    return (
        <>
            <Navbar>
                <div className="w-full justify-start" />
                <div className="flex gap-2 items-center w-60 mr-2 text-white">
                    <a href="/" className="p-1">History</a>
                    <a href="/clock-in" className="p-1">Attendance</a>
                    <a href="/login" className="p-1">Logout</a>
                </div>
            </Navbar>

            <div className="flex flex-col items-center">
                <span className="p-4 pt-28 mb-0 flex justify-center">
                    <h1 className="text-2xl mt-0 text-[#414141]">Edit Report</h1>
                </span>
                <span className="text-sm w-[559px]">
                    <h2 className="text-[15px] text-[#414141]">Kegiatan</h2>
                    <input
                        type="text"
                        className="flex-start bg-white rounded-md w-full h-[112px] justify-start mt-2 border-gray-300 px-4 items-start focus:ring-2 focus:border-blue-500 outline-none"
                        placeholder="Tuliskan Kegiatan Anda"
                    />
                </span>
                <span className="text-sm m-4 w-[559px]">
                    <h2 className="text-[15px] mt-4 text-[#414141]">Dokumentasi</h2>
                    <div className="bg-white w-50 h-50 rounded-lg mt-2 border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors cursor-pointer">
                        <input type="file" className="hidden" id="file-upload"/>
                        <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
                            <img src={Plus} className="w-12 h-12"/>
                            <span className="text-sm text-gray-500 mt-2">Upload Foto</span>
                        </label>
                    </div>
                </span>
                <div className="flex justify-center mt-4">
                    <a href="/" className="flex justify-center items-center bg-[#FF5454] w-20 rounded-lg p-1.5 cursor-pointer text-white ">Done</a>
                </div>
            </div>
        </>
    );
};
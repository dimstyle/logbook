import Navbar from "../../Components/User/Navbar.js";
import ProfileIcon from "../../../../assets/download-removebg-preview.png";
import EditIcon from "../../../../assets/edit-svgrepo-com.png"

export default function Profile() {
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
            <div className="p-4 pl-40 pr-40 pt-30">
                <div className="bg-[#F4F4F4] w-full p-10 rounded-xl">
                    <div className="flex items-center">
                        <img src={ProfileIcon} alt="UserIcon" />
                        <div className="flex flex-col w-full gap-8 ml-5">
                            <h1 className="text-3xl">Dimas sabunan</h1>
                            <h2 className="text-[#1D4ED8] text-xl">Siswa SMK</h2>
                        </div>
                        <div className="flex w-full justify-end mr-10">
                            <a href="" className="flex items-center gap-2 bg-[#F3E8FF] p-2 rounded-xl text-[#7C3AED]">Edit <img src={EditIcon} alt="EditIcon" width={"20px"} /></a>
                        </div>
                    </div>
                    <div className="flex flex-col mx-5 mt-20">
                        <h1 className="text-xl">Informasi siswa</h1>
                        <div className="flex gap-20 mt-10">
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Sekolah</h1>
                                <h1>Di sono</h1>
                            </div>
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Jurusan</h1>
                                <h1>Akadub</h1>
                            </div>
                        </div>
                        <div className="flex gap-20 mt-10">
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Email</h1>
                                <h1>Dimassabunan@gmail.com</h1>
                            </div>
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Nomor HP</h1>
                                <h1>911</h1>
                            </div>
                        </div>
                        <div className="flex gap-20 mt-10">
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Username</h1>
                                <h1>dimss1945</h1>
                            </div>
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Password</h1>
                                <h1>Gak tau</h1>
                            </div>
                        </div>
                        <div className="flex gap-30 mt-20 mb-10">
                            <div className="flex flex-col items-center bg-[#FFC7C7] w-full rounded-lg p-4 py-10">
                                <h1 className="text-xl text-[#FF5454]">0</h1>
                                <h1>Hadir</h1>
                            </div>
                            <div className="flex flex-col items-center bg-[#FFC7C7] w-full rounded-lg p-4 py-10">
                                <h1 className="text-xl text-[#FF5454]">100</h1>
                                <h1>Tidak Masuk</h1>
                            </div>
                            <div className="flex flex-col items-center bg-[#FFC7C7] w-full rounded-lg p-4 py-10">
                                <h1 className="text-xl text-[#FF5454]">0</h1>
                                <h1>Laporan</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
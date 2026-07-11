import AdminNavbar from "../../Components/Admin/Navbar.js";
import ProfileIcon from "../../../../assets/download-removebg-preview.png"
import EditIcon from "../../../../assets/edit-svgrepo-com.png"

export default function AdminProfile() {
    return (
        <>
            <AdminNavbar>
                <div className="w-full justify-start" />
                <div className="flex gap-2 items-center w-60 mr-7 text-white">
                    <a href="" className="p-1">Users</a>
                    <a href="" className="p-1">Registration</a>
                    <a href="/admin/daily-attendance" className="p-1">Attendance</a>
                </div>
            </AdminNavbar>
            <div className="p-4 pl-40 pr-40 pt-30">
                <div className="bg-[#F4F4F4] w-full p-10 rounded-xl">
                    <div className="flex items-center">
                        <img src={ProfileIcon} alt="UserIcon" />
                        <div className="flex flex-col w-full gap-8 ml-5">
                            <h1 className="text-3xl">Rafi</h1>
                            <h2 className="text-[#FF5454] text-xl">Administrator PKL</h2>
                        </div>
                        <div className="flex w-full justify-end mr-10">
                            <span className="flex items-center gap-2 bg-[#F3E8FF] p-2 rounded-xl text-[#7C3AED]">Edit <img src={EditIcon} alt="EditIcon" width={"20px"} /></span>
                        </div>
                    </div>
                    <div className="flex flex-col mx-5 mt-20">
                        <h1 className="text-xl">Informasi Administrator</h1>
                        <div className="flex gap-20 mt-10">
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Perusahaan</h1>
                                <h1>Di sono</h1>
                            </div>
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Divisi</h1>
                                <h1>HRD (Human Resource Development)</h1>
                            </div>
                        </div>
                        <div className="flex gap-20 mt-10">
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Email</h1>
                                <h1>Rafi1945@gmail.com</h1>
                            </div>
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Nomor HP</h1>
                                <h1>666</h1>
                            </div>
                        </div>
                        <div className="flex gap-20 mt-10">
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Username</h1>
                                <h1>rafi_ganteng</h1>
                            </div>
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Password</h1>
                                <h1>Yang itu</h1>
                            </div>
                        </div>
                        <div className="flex gap-30 mt-20 mb-10">
                            <div className="flex flex-col items-center bg-[#FFC7C7] w-full rounded-lg p-4 py-10">
                                <h1 className="text-xl text-[#FF5454]">0</h1>
                                <h1>Siswa PKL</h1>
                            </div>
                            <div className="flex flex-col items-center bg-[#FFC7C7] w-full rounded-lg p-4 py-10">
                                <h1 className="text-xl text-[#FF5454]">-1</h1>
                                <h1>Sekolah</h1>
                            </div>
                            <div className="flex flex-col items-center bg-[#FFC7C7] w-full rounded-lg p-4 py-10">
                                <h1 className="text-xl text-[#FF5454]">-10</h1>
                                <h1>Laporan Hari Ini</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
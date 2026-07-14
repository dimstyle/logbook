import AdminNavbar from "../../Components/Admin/Navbar.js";
import ProfileIcon from "../../../../assets/download-removebg-preview.png";

interface UserProfileProps {
    user: {
        id: number,
        name: string,
        username: string,
        role: string,
        email: string,
        school: string,
        major: string,
        noHP: string,
        password: string,
        attendance: number,
        notPresent: number,
        report: number
    }
}

export default function UserProfileOnAdmin({ user }: UserProfileProps) {
    return (
        <>
            <AdminNavbar>
                <div className="w-full justify-start" />
                <div className="flex gap-2 items-center w-60 mr-7 text-white">
                    <a href="/admin/user_list" className="p-1">Users</a>
                    <a href="/admin/user_registration" className="p-1">Registration</a>
                    <a href="/admin/daily_attendance" className="p-1">Attendance</a>
                </div>
            </AdminNavbar>
            <div className="p-4 pl-40 pr-40 pt-30">
                <div className="bg-[#F4F4F4] w-full p-10 rounded-xl">
                    <div className="flex items-center">
                        <img src={ProfileIcon} alt="UserIcon" />
                        <div className="flex flex-col w-full gap-8 ml-5">
                            <h1 className="text-3xl">{user.name}</h1>
                            <h2 className="text-[#1D4ED8] text-xl">{user.role}</h2>
                        </div>
                        <div className="flex w-full justify-end mr-10">
                            <a href="" className="flex items-center gap-2 bg-[#FFC7C7] p-2 rounded-xl text-[#FF5454]">Delete Account</a>
                        </div>
                    </div>
                    <div className="flex flex-col mx-5 mt-20">
                        <h1 className="text-xl">Informasi siswa</h1>
                        <div className="flex gap-20 mt-10">
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Sekolah</h1>
                                <h1>{user.school}</h1>
                            </div>
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Jurusan</h1>
                                <h1>{user.major}</h1>
                            </div>
                        </div>
                        <div className="flex gap-20 mt-10">
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Email</h1>
                                <h1>{user.email}</h1>
                            </div>
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Nomor HP</h1>
                                <h1>{user.noHP}</h1>
                            </div>
                        </div>
                        <div className="flex gap-20 mt-10">
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Username</h1>
                                <h1>{user.username}</h1>
                            </div>
                            <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                <h1 className="text-xl text-[#666]">Password</h1>
                                <h1>{user.password}</h1>
                            </div>
                        </div>
                        <div className="flex gap-30 mt-20 mb-10">
                            <div className="flex flex-col items-center bg-[#FFC7C7] w-full rounded-lg p-4 py-10">
                                <h1 className="text-xl text-[#FF5454]">{user.attendance}</h1>
                                <h1>Hadir</h1>
                            </div>
                            <div className="flex flex-col items-center bg-[#FFC7C7] w-full rounded-lg p-4 py-10">
                                <h1 className="text-xl text-[#FF5454]">{user.notPresent}</h1>
                                <h1>Tidak Masuk</h1>
                            </div>
                            <div className="flex flex-col items-center bg-[#FFC7C7] w-full rounded-lg p-4 py-10">
                                <h1 className="text-xl text-[#FF5454]">{user.report}</h1>
                                <h1>Laporan</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
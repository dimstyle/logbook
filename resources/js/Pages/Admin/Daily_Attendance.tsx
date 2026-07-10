import AdminNavbar from "../../Components/Admin/Navbar.js";

export default function DailyAttendance() {
    return (
        <>
            <AdminNavbar>
                <div className="w-full justify-start">
                    <input className="w-70 p-1.5 bg-white rounded-lg" type="text" placeholder="Search Users" />
                </div>
                <div className="flex gap-2 items-center w-60 mr-7 text-white">
                    <a href="" className="p-1">Users</a>
                    <a href="" className="p-1">Registration</a>
                    <a href="" className="bg-white text-black p-1 rounded-lg">Attendance</a>
                </div>
            </AdminNavbar>
        </>
    )
}
import AdminNavbar from "../../Components/Admin/Navbar.js"



export default function AdminReport() {
    
    
    return (
        <div className="h-screen">
            <AdminNavbar>
                <div className="flex gap-2 items-center w-60 mr-7 text-white">
                    <a href="" className="p-1">Users</a>
                    <a href="/admin/user-registration" className="p-1">Registration</a>
                    <a href="" className="bg-white text-black p-1 rounded-lg">Attendance</a>
                </div>
            </AdminNavbar>
            <div className="flex flex-col items-center">
                <h1 className="p-4 pt-30 left-4">Detail Laporan</h1>
                
            </div>
        </div>
    )
}
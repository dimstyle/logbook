import AdminNavbar from "../../Components/Admin/Navbar.js";

export default function UserRegistration() {
    return (
        <>
            <AdminNavbar>
                <div className="w-full justify-start" />
                <div className="flex gap-2 items-center w-60 mr-7 text-white">
                    <a href="/admin/user-list" className="p-1">Users</a>
                    <a href="" className="bg-white text-black p-1 rounded-lg">Registration</a>
                    <a href="/admin/daily-attendance" className="p-1">Attendance</a>
                </div>
            </AdminNavbar>
            <div className="flex flex-col items-center p-4 pt-30 w-full">
                <h1 className="text-2xl">Halaman Daftar</h1>
                <div className="flex flex-col w-170 gap-5">
                    <h2>Nama Lengkap</h2>
                    <input type="text" className="w-full p-1.5 bg-white rounded-lg" />
                    <h2>Email</h2>
                    <input type="email" className="w-full p-1.5 bg-white rounded-lg" />
                    <h2>No. HP</h2>
                    <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" className="w-full p-1.5 bg-white rounded-lg" />
                    <h2>Asal Sekolah</h2>
                    <input type="text" className="w-full p-1.5 bg-white rounded-lg" />
                    <h2>Kelas/Jurusan</h2>
                    <div className="flex w-full items-center gap-5">
                        <div className="w-full">
                            <h2>Kelas</h2>
                            <input type="text" className="w-full p-1.5 bg-white rounded-lg" />
                        </div>
                        <div className="w-full">
                            <h2>Jurusan</h2>
                            <input type="text" className="w-full p-1.5 bg-white rounded-lg" />
                        </div>
                    </div>
                    <h2>Periode PKL</h2>
                    <div className="flex w-full items-center gap-5">
                        <div>
                            <h2>Mulai</h2>
                            <input type="date" className="w-full p-1.5 bg-white rounded-lg" />
                        </div>
                        <div>
                            <h2>Selesai</h2>
                            <input type="date" className="w-full p-1.5 bg-white rounded-lg" />
                        </div>
                    </div>
                    <h2>Username</h2>
                    <input type="text" className="w-full p-1.5 bg-white rounded-lg" />
                    <h2>Password</h2>
                    <input type="password" className="w-full p-1.5 bg-white rounded-lg" />
                    <div className="flex justify-center mt-5 mb-10">
                        <a href="/admin/daily-attendance" className="flex justify-center items-center bg-[#FF5454] w-30 h-8 rounded-lg p-1.5 cursor-pointer text-white ">Buat Akun</a>
                    </div>
                </div>
            </div>
        </>
    )
}
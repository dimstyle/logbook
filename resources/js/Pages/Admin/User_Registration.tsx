import { useRef, useState } from "react";
import AdminNavbar from "../../Components/Admin/Navbar.js";
import api from "../../lib/axios.js";
import type { ErrorMessage } from "../ui/ErrorPage.js";
import ErrorPage from "../ui/ErrorPage.js";

export default function UserRegistration() {
    const [error ,  setError] = useState("");

    const fullNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const schoolRef = useRef<HTMLInputElement>(null);
    const classRef = useRef<HTMLInputElement>(null);
    const majorRef = useRef<HTMLInputElement>(null);
    const startDateRef = useRef<HTMLInputElement>(null);
    const endDateRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const registerEvent = async () => {
        const formData = {
            fullName: fullNameRef.current?.value || "",
            email: emailRef.current?.value || "",
            phone: phoneRef.current?.value || "",
            school: schoolRef.current?.value || "",
            class: classRef.current?.value || "",
            major: majorRef.current?.value || "",
            startDate: startDateRef.current?.value || "",
            endDate: endDateRef.current?.value || "",
            username: usernameRef.current?.value || "",
            password: passwordRef.current?.value || "",
        };

        const hasEmptyValue = Object.values(formData).some((value) => value.trim() === "");

        if (hasEmptyValue) {
            alert("Please fill in all fields.");
            return;
        }

        const registerPayload = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
        };

        const userInfoPayload = {
            account_id: 0,
            nama_lengkap: formData.fullName,
            sekolah: formData.school,
            jurusan: [formData.class, formData.major].filter(Boolean).join(" / "),
            nomor_telepon: formData.phone,
            periode_awal: formData.startDate,
            periode_akhir: formData.endDate,
        };

        try {
            const registerResponse = await api.post("/api/auth/register", registerPayload, {
                withCredentials: true,
            });

            const accountId = registerResponse.data?.account_id ?? 0;

            await api.post("/api/user/createuserinfo", {
                ...userInfoPayload,
                account_id: accountId,
            }, {
                withCredentials: true,
            });

            alert("Registration successful");
        } catch (error: any) {
            const message = error?.response?.data?.message || error?.message || "Something went wrong";
            const status = error?.response?.status || 500;
            setError(JSON.stringify({ message, status }));
        }
    };

    if (error){
        const errorMessage: ErrorMessage = JSON.parse(error);
        return <ErrorPage errorMessage={errorMessage} backPath="/admin/user_registration" />
        
    }

    return (
        <>
            <AdminNavbar>
                <div className="w-full justify-start" />
                <div className="flex gap-2 items-center w-60 mr-7 text-white">
                    <a href="/admin/user_list" className="p-1">Users</a>
                    <a href="" className="bg-white text-black p-1 rounded-lg">Registration</a>
                    <a href="/admin/daily_attendance" className="p-1">Attendance</a>
                </div>
            </AdminNavbar>
            <div className="flex flex-col items-center p-4 pt-30 w-full">
                <h1 className="text-2xl">Halaman Daftar</h1>
                <div className="flex flex-col w-170 gap-5">
                    <h2>Nama Lengkap</h2>
                    <input ref={fullNameRef} type="text" className="w-full p-1.5 bg-white rounded-lg" />
                    <h2>Email</h2>
                    <input ref={emailRef} type="email" className="w-full p-1.5 bg-white rounded-lg" />
                    <h2>No. HP</h2>
                    <input ref={phoneRef} type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" className="w-full p-1.5 bg-white rounded-lg" />
                    <h2>Asal Sekolah</h2>
                    <input ref={schoolRef} type="text" className="w-full p-1.5 bg-white rounded-lg" />
                    <h2>Kelas/Jurusan</h2>
                    <div className="flex w-full items-center gap-5">
                        <div className="w-full">
                            <h2>Kelas</h2>
                            <input ref={classRef} type="text" className="w-full p-1.5 bg-white rounded-lg" />
                        </div>
                        <div className="w-full">
                            <h2>Jurusan</h2>
                            <input ref={majorRef} type="text" className="w-full p-1.5 bg-white rounded-lg" />
                        </div>
                    </div>
                    <h2>Periode PKL</h2>
                    <div className="flex w-full items-center gap-5">
                        <div>
                            <h2>Mulai</h2>
                            <input ref={startDateRef} type="date" className="w-full p-1.5 bg-white rounded-lg" />
                        </div>
                        <div>
                            <h2>Selesai</h2>
                            <input ref={endDateRef} type="date" className="w-full p-1.5 bg-white rounded-lg" />
                        </div>
                    </div>
                    <h2>Username</h2>
                    <input ref={usernameRef} type="text" className="w-full p-1.5 bg-white rounded-lg" />
                    <h2>Password</h2>
                    <input ref={passwordRef} type="password" className="w-full p-1.5 bg-white rounded-lg" />
                    <div className="flex justify-center mt-5 mb-10">
                        <button
                            type="button"
                            onClick={registerEvent}
                            className="flex justify-center items-center bg-[#FF5454] w-30 h-8 rounded-lg p-1.5 cursor-pointer text-white"
                        >
                            Buat Akun
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
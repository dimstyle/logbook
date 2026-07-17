import { useState } from "react";
import AdminNavbar from "../../Components/Admin/AdminNavbar.js";
import api from "../../lib/axios.js";
import type { ErrorMessage } from "../ui/ErrorPage.js";
import ErrorPage from "../ui/ErrorPage.js";
import { useForm } from "@inertiajs/react";

export default function UserRegistration() {
    const [error, setError] = useState("");
    const { data, setData, processing, reset } = useForm({
        fullName: "",
        email: "",
        phone: "",
        school: "",
        class: "",
        major: "",
        startDate: "",
        endDate: "",
        username: "",
        password: "",
    });

    const registerEvent = async () => {
        const hasEmptyValue = Object.values(data).some((value) => String(value).trim() === "");

        if (hasEmptyValue) {
            alert("Please fill in all fields.");
            return;
        }

        const registerPayload = {
            username: data.username,
            email: data.email,
            password: data.password,
            nama_lengkap: data.fullName,
            sekolah: data.school,
            jurusan: [data.class, data.major].filter(Boolean).join(" / "),
            nomor_telepon: data.phone,
            periode_awal: data.startDate,
            periode_akhir: data.endDate,
        };

        try {
            await api.post("/api/auth/register", registerPayload, {
                withCredentials: true,
            });

            alert("Registration successful");
            reset();
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
            <AdminNavbar index={2} />
            
            <div className="flex flex-col items-center p-4 pt-30 w-full">
                <h1 className="text-2xl">Halaman Daftar</h1>
                <div className="flex flex-col w-170 gap-5">
                    <h2>Nama Lengkap</h2>
                    <input
                        type="text"
                        value={data.fullName}
                        onChange={(e) => setData("fullName", e.target.value)}
                        className="w-full p-1.5 bg-white rounded-lg"
                    />
                    <h2>Email</h2>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        className="w-full p-1.5 bg-white rounded-lg"
                    />
                    <h2>No. HP</h2>
                    <input
                        type="tel"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        className="w-full p-1.5 bg-white rounded-lg"
                    />
                    <h2>Asal Sekolah</h2>
                    <input
                        type="text"
                        value={data.school}
                        onChange={(e) => setData("school", e.target.value)}
                        className="w-full p-1.5 bg-white rounded-lg"
                    />
                    <h2>Kelas/Jurusan</h2>
                    <div className="flex w-full items-center gap-5">
                        <div className="w-full">
                            <h2>Kelas</h2>
                            <input
                                type="text"
                                value={data.class}
                                onChange={(e) => setData("class", e.target.value)}
                                className="w-full p-1.5 bg-white rounded-lg"
                            />
                        </div>
                        <div className="w-full">
                            <h2>Jurusan</h2>
                            <input
                                type="text"
                                value={data.major}
                                onChange={(e) => setData("major", e.target.value)}
                                className="w-full p-1.5 bg-white rounded-lg"
                            />
                        </div>
                    </div>
                    <h2>Periode PKL</h2>
                    <div className="flex w-full items-center gap-5">
                        <div>
                            <h2>Mulai</h2>
                            <input
                                type="date"
                                value={data.startDate}
                                onChange={(e) => setData("startDate", e.target.value)}
                                className="w-full p-1.5 bg-white rounded-lg"
                            />
                        </div>
                        <div>
                            <h2>Selesai</h2>
                            <input
                                type="date"
                                value={data.endDate}
                                onChange={(e) => setData("endDate", e.target.value)}
                                className="w-full p-1.5 bg-white rounded-lg"
                            />
                        </div>
                    </div>
                    <h2>Username</h2>
                    <input
                        type="text"
                        value={data.username}
                        onChange={(e) => setData("username", e.target.value)}
                        className="w-full p-1.5 bg-white rounded-lg"
                    />
                    <h2>Password</h2>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        className="w-full p-1.5 bg-white rounded-lg"
                    />
                    <div className="flex justify-center mt-5 mb-10">
                        <button
                            type="button"
                            onClick={registerEvent}
                            className="flex justify-center items-center bg-[#FF5454] w-30 h-8 rounded-lg p-1.5 cursor-pointer text-white"
                            disabled={processing}
                        >
                            {processing ? "Loading..." : "Buat Akun"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
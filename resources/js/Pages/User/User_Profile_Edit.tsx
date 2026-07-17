import UserNavbar from "../../Components/User/UserNavbar.js";
import ProfileIcon from "../../../../assets/download-removebg-preview.png";
import React, { useEffect, useRef, useState } from "react";
import { type getUserProfileResponse, type UpdateUserProfileRequest } from "../../types/user.js";
import LoadingPage from "../ui/LoadingPage.js";
import ErrorPage from "../ui/ErrorPage.js";
import api from "../../lib/axios.js";
import { Link, useForm } from "@inertiajs/react";
import { DeleteIcon } from "lucide-react";

function EliminateEmptyString(data: Record<string, string>){
    return Object.fromEntries(
        Object.entries(data).filter(([_, value]) => {
            return value !== "" && value !== null && value !== undefined;
        })
    )
}

function concatObjectValue(data: Record<string, string>, delimiter: string = ", "){
    return Object.entries(data)
    .map(val => val[1])
    .join(delimiter);
}


export default function UserProfileEdit() {
    const isFetched = useRef(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { data, setData, patch, processing, errors, transform} = useForm<UpdateUserProfileRequest>({
        username: "",
        email: "",
        password: "",
        nama_lengkap: "",
        sekolah: "",
        jurusan: "",
        nomor_telepon: ""
    })

    useEffect(()=>{
        if (isFetched.current) return;
        isFetched.current = true;
    
        (async ()=>{
            try{
                const response = await api.get<getUserProfileResponse>('/api/user/getuserprofile');
                const currentUser = response.data?.user;

                if (currentUser) {
                    setData({
                        nama_lengkap: currentUser.nama_lengkap || "",
                        sekolah: currentUser.sekolah || "",
                        jurusan: currentUser.jurusan || "",
                        email: currentUser.email || "",
                        nomor_telepon: currentUser.nomor_telepon || "",
                        username: currentUser.username || "",
                        password: ""
                    })
                }    
            }catch(err: unknown){
                const axiosError = err as { response?: { data?: { message?: string }; status?: number }; message?: string };
                const message = axiosError?.response?.data?.message ?? axiosError?.message ?? 'Something went wrong';
                const status = axiosError?.response?.status ?? 500;

                setError(JSON.stringify({ message, status }));
            }finally{
                setLoading(false)
            }
        })()    
    })

    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault();

        transform((data: Record<string, string>) => EliminateEmptyString(data));

        patch('/api/user/updateuserprofile', {
            onSucces: () => alert("Profil berhasil diubah!"),
            onError: (err: unknown) => {
                setError(JSON.stringify({
                    message: concatObjectValue(errors),
                    status: 500
                }))
            }
        })
    }
    
    if(loading){
        return <LoadingPage />
    }
    
    if (error){
        const errMessage = JSON.parse(error);
        return <ErrorPage errorMessage={errMessage} backPath="/login"/>
    }
    
    return (
        <>
            <UserNavbar />

            <div className="p-4 pl-40 pr-40 pt-30">
                <form onSubmit={handleSubmit} className="bg-[#F4F4F4] w-full p-10 rounded-xl">
                    <div className="bg-[#F4F4F4] w-full p-10 rounded-xl">
                        <div className="flex items-center gap-3 py-2">
                            <Link href='/user_profile' className='flex gap-2 items-center text-gray-700 bg-white hover:bg-gray-200 p-2 rounded-full shadow-sm'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/>
                                </svg>
                                <h1>Back</h1>
                            </Link>
                        </div>
                        <div className="flex flex-col w-full items-center">
                            <label className="group relative w-60 rounded-full overflow-hidden cursor-pointer">
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                />
                                <img 
                                    className="w-full object-cover aspect-square transition-all duration-300 group-hover:scale-105" 
                                    src={ProfileIcon} 
                                    alt="UserIcon"
                                />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <svg 
                                        className="h-8 w-8 text-white" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor" 
                                        stroke-width="2"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </div>
                            </label>
                            <div className="flex flex-col w-full gap-4 ml-10 mt-10">
                                <h1 className="text-2xl">Nama</h1>
                                <input value={data.nama_lengkap} onChange={e => setData('nama_lengkap', e.target.value)} type="text" className="w-150 p-1.5 bg-[#666] rounded-lg text-white" />
                                {errors.nama_lengkap && <span className="text-red-500">{errors.nama_lengkap}</span>}
                            </div>
                        </div>
                        <div className="flex flex-col mx-5 mt-20">
                            <h1 className="text-xl">Informasi Siswa</h1>
                            <div className="flex gap-20 mt-10">
                                <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                    <h1 className="text-xl text-[#666]">Sekolah</h1>
                                    <input value={data.sekolah} onChange={e => setData('sekolah', e.target.value)} type="text" className="w-full p-1.5 bg-[#666] rounded-lg text-white" />
                                    {errors.sekolah && <span className="text-red-500">{errors.sekolah}</span>}
                                </div>
                                <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                    <h1 className="text-xl text-[#666]">Jurusan</h1>
                                    <input value={data.jurusan} onChange={e => setData('jurusan', e.target.value)} type="text" className="w-full p-1.5 bg-[#666] rounded-lg text-white" />
                                    {errors.jurusan && <span className="text-red-500">{errors.jurusan}</span>}
                                </div>
                            </div>
                            <div className="flex gap-20 mt-10">
                                <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                    <h1 className="text-xl text-[#666]">Email</h1>
                                    <input value={data.email} onChange={e => setData('email', e.target.value)} type="text" className="w-full p-1.5 bg-[#666] rounded-lg text-white" />
                                    {errors.email && <span className="text-red-500">{errors.email}</span>}
                                </div>
                                <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                    <h1 className="text-xl text-[#666]">Nomor HP</h1>
                                    <input value={data.nomor_telepon} onChange={e => setData('nomor_telepon', e.target.value)} type="text" className="w-full p-1.5 bg-[#666] rounded-lg text-white" />
                                    {errors.nomor_telepon && <span className="text-red-500">{errors.nomor_telepon}</span>}
                                </div>
                            </div>
                            <div className="flex gap-20 mt-10">
                                <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                    <h1 className="text-xl text-[#666]">Username</h1>
                                    <input value={data.username} onChange={e => setData('username', e.target.value)} type="text" className="w-full p-1.5 bg-[#666] rounded-lg text-white" />
                                    {errors.username && <span className="text-red-500">{errors.username}</span>}
                                </div>
                                <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                    <h1 className="text-xl text-[#666]">Password</h1>
                                    <input value={data.password} onChange={e => setData('password', e.target.value)} type="text" className="w-full p-1.5 bg-[#666] rounded-lg text-white" />
                                    {errors.password && <span className="text-red-500">{errors.password}</span>}
                                </div>
                            </div>
                            <div className="flex justify-center mt-20">
                                <button type="submit" disabled={processing} className="bg-[#FF5454] text-white px-6 py-2 rounded-lg disabled:bg-gray-400 cursor-pointer">
                                    {processing ? "Saving..." : "Simpan Perubahan"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
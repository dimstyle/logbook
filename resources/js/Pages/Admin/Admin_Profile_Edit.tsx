import AdminNavbar from "../../Components/Admin/AdminNavbar.js";
import ProfileIcon from "../../../../assets/download-removebg-preview.png";
import React, { useEffect, useRef, useState } from "react";
import { type getAdminProfileResponse, type UpdateAdminProfileRequest } from "../../types/user.js";
import LoadingPage from "../ui/LoadingPage.js";
import ErrorPage from "../ui/ErrorPage.js";
import api from "../../lib/axios.js";
import { Link, useForm } from "@inertiajs/react";

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

export default function AdminProfileEdit() {
    const isFetched = useRef(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [preview, setPreview] = useState<string | null>(null);

    const { data, setData, patch, processing, errors, transform} = useForm<UpdateAdminProfileRequest>({
        username: "",
        email: "",
        password: "",
        nama_lengkap: "",
        perusahaan: "",
        divisi: "",
        nomor_telepon: "",
        profile_photo: null as File | null
    })

    useEffect(()=>{
        if (isFetched.current) return;
        isFetched.current = true;
    
        (async ()=>{
            try{
                const response = await api.get<getAdminProfileResponse>('/api/user/getadminprofile');
                const currentUser = response.data?.admin;

                if (currentUser) {
                    setData({
                        nama_lengkap: currentUser.nama_lengkap || "",
                        perusahaan: currentUser.perusahaan || "",
                        divisi: currentUser.divisi || "",
                        email: currentUser.email || "",
                        nomor_telepon: currentUser.nomor_telepon || "",
                        username: currentUser.username || "",
                        password: ""
                    })

                    if(currentUser.profile_photo) setPreview('/storage/'+currentUser.profile_photo);
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

        patch('/api/user/updateadminprofile', {
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
        return <ErrorPage errorMessage={errMessage} backPath="/admin/login"/>
    }

    return (
        <>
            <AdminNavbar />
            
            <div className="p-4 pl-40 pr-40 pt-30">
                <form onSubmit={handleSubmit} className="bg-[#F4F4F4] w-full p-10 rounded-xl">
                    <div className="bg-[#F4F4F4] w-full p-10 rounded-xl">
                        <div className="flex items-center gap-3 py-2">
                            <Link href='/admin/profile' className='flex gap-2 items-center text-gray-700 bg-white hover:bg-gray-200 p-2 rounded-full shadow-sm'>
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
                                    onChange={(e) => {
                                        const file = e.target.files?.[0] ?? null;

                                        if(!file) return

                                        setData('profile_photo', file);
                                        setPreview(URL.createObjectURL(file));
                                    }}
                                />
                                <img 
                                    className="w-full object-cover aspect-square transition-all duration-300 group-hover:scale-105" 
                                    src={preview || ProfileIcon} 
                                    alt="UserIcon"
                                />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <svg 
                                        className="h-8 w-8 text-white" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor" 
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
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
                            <h1 className="text-xl">Informasi Administrator</h1>
                            <div className="flex gap-20 mt-10">
                                <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                    <h1 className="text-xl text-[#666]">Perusahaan</h1>
                                    <input value={data.perusahaan} onChange={e => setData('perusahaan', e.target.value)} type="text" className="w-full p-1.5 bg-[#666] rounded-lg text-white" />
                                    {errors.perusahaan && <span className="text-red-500">{errors.perusahaan}</span>}
                                </div>
                                <div className="bg-gray-200 w-full border-2 border-[#999] rounded-lg p-4">
                                    <h1 className="text-xl text-[#666]">Divisi</h1>
                                    <input value={data.divisi} onChange={e => setData('divisi', e.target.value)} type="text" className="w-full p-1.5 bg-[#666] rounded-lg text-white" />
                                    {errors.divisi && <span className="text-red-500">{errors.divisi}</span>}
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
                                    <input value={data.password} onChange={e => setData('password', e.target.value)} type="password" className="w-full p-1.5 bg-[#666] rounded-lg text-white" />
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
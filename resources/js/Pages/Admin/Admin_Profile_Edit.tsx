import AdminNavbar from "../../Components/Admin/AdminNavbar.js";
import ProfileIcon from "../../../../assets/download-removebg-preview.png";
import React, { useEffect, useRef, useState } from "react";
import { type getAdminProfileResponse, type UpdateAdminProfileRequest } from "../../types/user.js";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css';
import LoadingPage from "../ui/LoadingPage.js";
import ErrorPage from "../ui/ErrorPage.js";
import api from "../../lib/axios.js";
import { Link, router, useForm } from "@inertiajs/react";
import type { DefaultResponse } from "../../types/default.js";

function EliminateEmptyString(data: UpdateAdminProfileRequest){
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (key === 'profile_photo') {
            if (value instanceof File) {
                formData.append(key, value)
            }
            return
        }

        if (value === null || value === undefined || value === '') return

        formData.append(
            key, 
            value instanceof File ? value : String(value)
        );
    })
    return formData
}

export default function AdminProfileEdit() {
    const isFetched = useRef(false);
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [preview, setPreview] = useState<string | null>(null);
    const [rawImageSrc, setRawImageSrc] = useState<string>("");
    const [crop, setCrop] = useState<Crop>({
        unit: '%',
        width: 90,
        height: 90,
        x: 5,
        y: 5,
    });
    const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);
    const [showCropperModal, setShowCropperModal] = useState(false);
    const [showPassModal, setShowPassModal] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    const { data, setData, processing, errors}  = useForm<UpdateAdminProfileRequest>({
        username: "",
        email: "",
        password: "",
        nama_lengkap: "",
        perusahaan: "",
        divisi: "",
        nomor_telepon: "",
        profile_photo: null as File | null
    })


    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        const { width, height } = e.currentTarget;
        const initialCrop = centerCrop(
            makeAspectCrop({ unit: '%', width: 90 }, 1, width, height),
            width,
            height
        );
        setCrop(initialCrop);
    }
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
    
        setCompletedCrop(null)

        setCrop({
            unit: "%",
            width: 90,
            height: 90,
            x: 5,
            y: 5,
        });

        const reader = new FileReader();
        reader.onload = () => {
            setRawImageSrc(reader.result as string);
            setShowCropperModal(true);
        };
        reader.readAsDataURL(file);
        
        e.target.value = ""
    };
    
    const handleCropComplete = async (cropToUse: Crop) => {
        if (!completedCrop || !imgRef.current) return;
    
        const image = imgRef.current;
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
    
        const TARGET_SIZE = 400;
        canvas.width = TARGET_SIZE;
        canvas.height = TARGET_SIZE;
        const ctx = canvas.getContext("2d");
    
        if (!ctx) return;
    
        ctx.drawImage(
            image,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            TARGET_SIZE,
            TARGET_SIZE
        );
    
        canvas.toBlob((blob) => {
            if (!blob) return;
            const croppedFile = new File([blob], "profile-cropped.jpg", { type: "image/jpeg" });
                
            setData('profile_photo', croppedFile);
            setPreview(URL.createObjectURL(croppedFile));
            setShowCropperModal(false);
        }, "image/jpeg", 0.95);
    };

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
                        password: "",
                        profile_photo: null
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
    },[])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const requestData = EliminateEmptyString(data)
     
        try{
            const response = await api.patch<DefaultResponse>('/api/user/updateadminprofile', requestData);
            const resData = response.data;

            alert(resData.message);

        }catch(err: unknown){
            const axiosError = err as { response?: { data?: { message?: string }; status?: number }; message?: string };
            const message = axiosError?.response?.data?.message ?? axiosError?.message ?? 'Something went wrong';
            const status = axiosError?.response?.status ?? 500;
            alert(message)
            setError(JSON.stringify({ message, status }));
        }

        setIsSubmitted(true)
    }
    
    if(loading){
        return <LoadingPage />
    }
    
    if (error){
        const errMessage = JSON.parse(error);
        return <ErrorPage errorMessage={errMessage} backPath="/admin/login"/>
    }

    if (isSubmitted) {
        router.get('/admin/profile')
        return;
    }

    return (
        <>
            <AdminNavbar />
            
            <div className="p-4 pl-40 pr-40 pt-30">
                <form onSubmit={handleSubmit} className="bg-[#F4F4F4] w-full p-10 rounded-xl">
                    <div className="bg-[#F4F4F4] w-full p-10 rounded-xl">
                        <div className="flex items-center gap-3 py-2">
                            <Link href='/admin/profile' className='flex gap-2 items-center bg-white hover:bg-black/5 p-2 rounded-full shadow-sm'>
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
                                    onChange={handleFileChange}
                                />
                                <img 
                                    className="w-60 h-60 object-cover aspect-square transition-all duration-300 group-hover:scale-105" 
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
                            <div className="flex flex-col w-full gap-4 px-5 mt-10">
                                <h1 className="text-2xl">Nama</h1>
                                <input value={data.nama_lengkap} onChange={e => setData('nama_lengkap', e.target.value)} type="text" className="w-full max-w-sm md:max-w-xl lg:max-w-lg p-1.5 bg-[#666] rounded-lg text-white" />
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
                                    <div className="flex justify-center">
                                        <button type="button" onClick={() => setShowPassModal(true)} className="bg-[#FF5454] text-white p-1.5 rounded-lg cursor-pointer shadow-lg">Ubah password</button>
                                    </div>
                                    {errors.password && <span className="text-red-500">{errors.password}</span>}
                                </div>
                            </div>
                            <div className="flex justify-center mt-20">
                                <button type="submit" disabled={processing} className="bg-[#FF5454] text-white px-6 py-2 rounded-lg hover:bg-[#E54747] hover:scale-105 duration-200 transition-all shadow-lg disabled:bg-gray-400 cursor-pointer">
                                    {processing ? "Saving..." : "Simpan Perubahan"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {showCropperModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 z-1001">
                    <div className="bg-white p-6 rounded-xl max-w-lg w-full flex flex-col items-center shadow-xl">
                        <h2 className="text-xl font-semibold mb-4">Sesuaikan Foto Profil</h2>
                        <div className="max-h-[60vh] overflow-auto flex justify-center w-full">
                            <ReactCrop
                                crop={crop}
                                onChange={(c) => setCrop(c)}
                                onComplete={(c) => setCompletedCrop(c)}
                                aspect={1}
                                circularCrop
                            >
                                <img
                                    ref={imgRef} 
                                    src={rawImageSrc} 
                                    alt="Crop preview"
                                    onLoad={onImageLoad}
                                    style={{ maxHeight: '50vh', display: 'block', width: '100%', height: 'auto' }}
                                />
                            </ReactCrop>
                        </div>
                        <div className="flex justify-end gap-3 mt-6 w-full">
                            <button
                                type="button"
                                onClick={() => setShowCropperModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 cursor-pointer"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    handleCropComplete(completedCrop ?? crop)
                                }}
                                className="px-4 py-2 bg-[#FF5454] text-white rounded-lg hover:bg-[#E54747] cursor-pointer"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showPassModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 z-1001">
                    <div className="bg-white p-6 rounded-xl max-w-lg w-full flex flex-col items-center shadow-xl">
                        <h2 className="text-xl font-semibold mb-4">Ubah Password</h2>
                        <div className="flex flex-col gap-3 mt-6 w-full">
                            <h2>Password Sebelumnya</h2>
                            <input onChange={e => setData('password', e.target.value)} type="password" className="w-full p-1.5 bg-[#666] rounded-lg text-white" />
                            <h2>Password Baru</h2>
                            <input onChange={e => setData('password', e.target.value)} type="password" className="w-full p-1.5 bg-[#666] rounded-lg text-white" />
                        </div>
                        <div className="flex justify-end gap-3 mt-6 w-full">
                            <button
                                type="button"
                                onClick={() => setShowPassModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 cursor-pointer"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-[#FF5454] text-white rounded-lg hover:bg-[#E54747] cursor-pointer"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
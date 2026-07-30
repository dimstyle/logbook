import UserNavbar from "../../Components/User/UserNavbar.js";
import Plus from "../../../../assets/plus.png"
import { router, usePage } from "@inertiajs/react";
import React, { useState } from "react";
import api from "../../lib/axios.js";
import type { DefaultResponse } from "../../types/default.js";
import ErrorPage from "../ui/ErrorPage.js";

export default function ActivityReport() {
    const { izin, sakit, sudah_laporan, sudah_hadir } = usePage().props;
    const [error, setError] = useState("");

    const [laporan, setLaporan] = useState("");
    const [images, setImages] = useState<File[]>([]);

    const imageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;


        setImages(images => [...images, file]);
    }

    const submitHandler = async ()=>{
        if(!images || !laporan) return;

        const formData = new FormData();

        formData.append('laporan', laporan);
        
        images.forEach(image => {
            formData.append('images[]', image);
        })
    

        try{
            const response = await api.post('/api/attendance/createreport', formData,{
                headers: {
                    "Content-Type" : "multipart/form-data"
                }
            });
            const resdata = response.data;
            
            alert(resdata.message);
            
            router.get('/clock-out');
        }catch(err: unknown){
            const axiosError = err as { response?: { data?: DefaultResponse; status?: number }; message?: string };
            const message = axiosError?.response?.data?.message ?? axiosError?.message ?? 'Something went wrong';
            const status = axiosError?.response?.status ?? 500;
            setError(JSON.stringify({ message, status }));
        }
    }

    if (sudah_laporan || izin || sakit) {
        router.get('/clock-out');
        return
    }

    if (!sudah_hadir) {
        router.get('/clock-in')
        return
    }


    if (error) {
        const errorMessage = JSON.parse(error);
        return <ErrorPage errorMessage={errorMessage} backPath="/report" />
    }
    return (
        <div className="h-screen">
            
            <UserNavbar index={2} />

            <div className="flex flex-col p-4 pt-30 w-full items-center">
                <h1 className="text-2xl">Attendance Activity Report</h1>
                <div className="flex w-170 flex-col gap-5" >
                    <h2 className="mt-10">Kegiatan</h2>
                    <input onChange={(event: React.ChangeEvent<HTMLInputElement>)=> setLaporan(event.target.value)} type="text" className="bg-white rounded-lg p-1.5 w-full"/>
                    <h2>Dokumentasi</h2>
                    <div className="flex gap-3 overflow-x-auto">
                        {
                            images.map((image, idx) =>{
                 
                                 const updateHandler = (event: React.ChangeEvent<HTMLInputElement>, index = idx) =>{
                                    const file = event.target.files?.[0]

                                    if(!file) return;

                    
                                    setImages(images => images.map((image, idx) => {
                                        return idx === index? file : image
                                    }))
                                    
                                }

                                return (
                                    <label htmlFor={`file-upload-${idx}`} className="shrink-0 bg-white w-50 h-50 rounded-xl mt-2 border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors cursor-pointer">
                                        <input id={`file-upload-${idx}`} onChange={updateHandler} type="file" className="hidden" />
                                        <img src={ URL.createObjectURL(image) } className="w-full h-full rounded-xl" />
                                    </label> 
                                )
                            })
                        }     
                        <label htmlFor="file-upload" className="shrink-0 bg-white w-50 h-50 rounded-xl mt-2 border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors cursor-pointer">
                            <input onChange={imageHandler} type="file" className="hidden" id="file-upload"/>
                            <img src={Plus} className="w-12 h-12" />
                        </label> 
                    </div>
                </div>
            </div>
            <div className="p-4 pt-5">
                <div className="justify-center flex mt-5 mb-10">
                    <button onClick={submitHandler} className="flex justify-center items-center bg-[#FF5454] w-30 h-8 rounded-lg p-1.5 cursor-pointer text-white ">Submit</button>
                </div>
            </div>
        </div>
    )
}
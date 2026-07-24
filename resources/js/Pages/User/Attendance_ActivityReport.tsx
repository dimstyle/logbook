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
    const [imageForms, setImageForms] = useState<React.ReactNode[]>([]);
    const [imageIndex, setImageIndex] = useState(0);

    const imageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        
        const updateHandler = (event: React.ChangeEvent<HTMLInputElement>, index = imageIndex) =>{
            const file = event.target.files?.[0]

            if(!file) return;

            const newForm =   <label htmlFor="file-upload" className="bg-white w-47.5 h-47.5 rounded-[29px] mt-2 border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors cursor-pointer">
                                <input onChange={updateHandler} type="file" className="hidden" id="file-upload"/>
                                <img src={ URL.createObjectURL(file) || Plus} className="w-12 h12" />
                            </label> 

            setImages(images => images.map((image, idx) => {
                return idx === index? file : image
            }))
            
            setImageForms(forms => forms.map((oldForm,idx)=>{
                return idx === index? newForm : oldForm
            }))
         }

         
         const form =   <label htmlFor="file-upload" className="bg-white w-47.5 h-47.5 rounded-[29px] mt-2 border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors cursor-pointer">
                            <input onChange={updateHandler} type="file" className="hidden" id="file-upload"/>
                            <img src={ URL.createObjectURL(file) || Plus} className="w-12 h12" />
                        </label> 


        setImages(images => [...images, file]);
        setImageForms(forms => [...forms,form])
        setImageIndex(index => index +1)
    }

    const submitHandler = async ()=>{
        if(!images || !laporan) return

        console.log(images)


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

    if (!sudah_hadir) {
        router.get('/clock-in')
        return
    }

    if (sudah_laporan) {
        router.get('/clock-out');
        return
    }

    if (error) {
        const errorMessage = JSON.parse(error);
        return <ErrorPage errorMessage={errorMessage} backPath="/report" />
    }

    return (
        <div className="h-screen">
            
            <UserNavbar index={2} />

            <div className="flex flex-col p-4 pt-30 w-full items-center ">
                <h1 className="text-2xl">Attendance Activity Report</h1>
                <div className="flex w-170 flex-col gap-5" >
                    <h2>Kegiatan</h2>
                    <input onChange={(event: React.ChangeEvent<HTMLInputElement>)=> setLaporan(event.target.value)} type="text" className="bg-white rounded-lg p-1.5 w-full"/>
                    <h2>Dokumentasi</h2>
                    <div className="flex gap-3">
                        {
                            imageForms
                        }
                        <label htmlFor="file-upload" className="bg-white w-47.5 h-47.5 rounded-[29px] mt-2 border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors cursor-pointer">
                            <input onChange={imageHandler} type="file" className="hidden" id="file-upload"/>
                            <img src={Plus} className="w-12 h12" />
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
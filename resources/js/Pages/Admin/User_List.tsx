import AdminNavbar from "../../Components/Admin/AdminNavbar.js";
import React, { useState, useEffect, useRef , type ChangeEvent } from "react";
import { Link } from "@inertiajs/react";
import ProfileIcon from "../../../../assets/download-removebg-preview.png"
import ViewIcon from "../../../../assets/view-eye-svgrepo-com.png"
import LoadingPage from "../ui/LoadingPage.js";
import ErrorPage from "../ui/ErrorPage.js";
import StatCard from "../../Components/Admin/StatCard.js";
import api from "../../lib/axios.js";
import { type getListUsersInfoResponse } from "../../types/user.js";

export default function UserList() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [selectedSchool, setSelectedSchool] = useState<string>("ALL");
    
    const [ users, setUsers ] = useState<getListUsersInfoResponse>();
    const [ error, setError ] = useState("");
    const [ loading, setLoading ] = useState(true);
    const isFetched = useRef(false);

    useEffect(()=>{
        if(isFetched.current) return;
        isFetched.current = true;

        ;(async()=>{
            try{
                const response = await api.get<getListUsersInfoResponse>('/api/user/getlistusersinfo');
                setUsers(response.data);
            }catch(err: unknown){
                const axiosError = err as { response?: { data?: { message?: string }; status?: number }; message?: string };
                const message = axiosError?.response?.data?.message ?? axiosError?.message ?? 'Something went wrong';
                const status = axiosError?.response?.status ?? 500;
                setError(JSON.stringify({ message, status }));
            }finally{
                setLoading(false);
            }
        })();
    })
        
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchQuery(event.target.value);
    }

    const schoolsList = Array.from(new Set ((users?.users ?? []).map(u => u.sekolah)));

    const filteredUser = (users?.users ?? []).filter((user) => {
        const lowercaseQuery = searchQuery.toLocaleLowerCase();
        const matchesSearch =
            user.nama_lengkap.toLocaleLowerCase().includes(lowercaseQuery) ||
            user.email.toLocaleLowerCase().includes(lowercaseQuery) ||
            user.sekolah.toLocaleLowerCase().includes(lowercaseQuery) ||
            user.jurusan.toLocaleLowerCase().includes(lowercaseQuery);
        
        const matchesSchool = selectedSchool === "ALL" || user.sekolah === selectedSchool;

        return matchesSearch && matchesSchool;
    })

    if (loading){
        return <LoadingPage />
    }

    if (error) {
        return <ErrorPage />
    }

    const totalUsers = users?.users?.length ?? 0;

    return (
        <>
            <AdminNavbar 
                index={1} 
                input 
                inputValue={searchQuery}
                inputplaceholder="Search Users" 
                onChangeHandler={handleSearchChange}
            />

            <div className="flex flex-col p-6 pt-28 gap-6 max-w-7xl mx-auto">
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatCard title="Total Siswa PKL" value={totalUsers} textColor="text-blue-600" />
                    <StatCard title="Total Sekolah Terdaftar" value={schoolsList.length} textColor="text-emerald-600" />
                    <StatCard title="Hasil Pencarian" value={filteredUser.length} textColor="text-blue-600" />
                </div> */}

                <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
                    <h1 className="text-xl font-bold text-black">Daftar Pengguna</h1>
                    <div className="flex items-center gap-3">
                        <label className="text-sm font-medium text-gray-600">Filter Sekolah:</label>
                        <select
                            value={selectedSchool}
                            onChange={(e) => setSelectedSchool(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="ALL">Semua Sekolah</option>
                            {schoolsList.map((sekolah, index ) => (
                                <option key={index} value={sekolah}>{sekolah}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex flex-col p-4 pt-4 gap-10">
                    {filteredUser.length > 0 ? (
                        filteredUser.map((user) => {
                            const profile_photo = user.profile_photo ? '/storage/'+user.profile_photo : "" ;
                            return (
                                <div key={user.id} className="flex w-full items-center p-5 bg-[#FFFFFF] rounded-lg">
                                    <img className="w-27.5 h-27.5 rounded-full object-cover aspect-square" src={profile_photo || ProfileIcon} alt="UserIcon" width={130} />
                                    <div className="flex flex-col w-full gap-3 ml-2">
                                        <h1 className="text-2xl">{user.nama_lengkap}</h1>
                                        <div className="flex gap-2">
                                            <h2>{user.sekolah}</h2>
                                            <h1>•</h1>
                                            <h2>{user.jurusan}</h2>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full items-end">
                                        <Link href={`/admin/user_profile/${user.id}`} className="flex items-center bg-[#DBEAFE] p-2 rounded-xl text-[#1D4ED8]"><img src={ViewIcon} alt="ViewIcon" width={20} />View</Link>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className="flex w-full justify-center">
                            <h1 className="text-3xl">No Users Found.</h1>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
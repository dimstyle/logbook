import AdminNavbar from "../../Components/Admin/Navbar.js";
import React, { useState, type ChangeEvent } from "react";
import ProfileIcon from "../../../../assets/download-removebg-preview.png"
import ViewIcon from "../../../../assets/view-eye-svgrepo-com.png"

interface User {
    name: string,
    email: string,
    school: string,
    major: string
}

const MOCK_USERS: User[] = [
    { name: "Udin", email: "udin1945@gmail.com", school: "SMK Letris 2 Pamulang", major: "Rekayasa Perangkat Lunak" },
    { name: "Tono", email: "tono1945@gmail.com", school: "SMK Letris 2 Pamulang", major: "Rekayasa Perangkat Lunak" },
    { name: "Tony", email: "tony1945@gmail.com", school: "SMK Letris 2 Pamulang", major: "Rekayasa Perangkat Lunak" },
    { name: "Ucup", email: "ucup1945@gmail.com", school: "SMK Letris 2 Pamulang", major: "Rekayasa Perangkat Lunak" },
    { name: "Ucok", email: "ucok1945@gmail.com", school: "SMK Letris 2 Pamulang", major: "Rekayasa Perangkat Lunak" },
]

export default function UserList() {
    const [searchQuery, setSearchQuery] = useState<string>("");
        
        const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
            setSearchQuery(event.target.value);
        }
    
        const filteredUser = MOCK_USERS.filter((user) => {
            const lowercaseQuery = searchQuery.toLocaleLowerCase();
            return (
                user.name.toLocaleLowerCase().includes(lowercaseQuery) ||
                user.email.toLocaleLowerCase().includes(lowercaseQuery) ||
                user.school.toLocaleLowerCase().includes(lowercaseQuery) ||
                user.major.toLocaleLowerCase().includes(lowercaseQuery)
            )
        })

    return (
        <>
            <AdminNavbar>
                <div className="w-full justify-start">
                    <input className="w-70 p-1.5 bg-white rounded-lg" type="text" placeholder="Search Users" value={searchQuery} onChange={handleSearchChange} />
                </div>
                <div className="flex gap-2 items-center w-60 mr-7 text-white">
                    <a href="" className="bg-white text-black p-1 rounded-lg">Users</a>
                    <a href="/admin/user-registration" className="p-1">Registration</a>
                    <a href="/admin/daily-attendance" className="p-1">Attendance</a>
                </div>
            </AdminNavbar>
            <div className="flex flex-col p-4 pt-30 gap-10">
                {filteredUser.length > 0 ? (
                    filteredUser.map((user) => {
                        return (
                            <div className="flex w-full items-center p-5 bg-[#FFFFFF] rounded-lg">
                                <img src={ProfileIcon} alt="UserIcon" width={130} />
                                <div className="flex flex-col w-full gap-3 ml-2">
                                    <h1 className="text-2xl">{user.name}</h1>
                                    <div className="flex gap-2">
                                        <h2>{user.school}</h2>
                                        <h1>•</h1>
                                        <h2>{user.major}</h2>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full items-end">
                                    <a href="" className="flex items-center bg-[#DBEAFE] p-2 rounded-xl text-[#1D4ED8]"><img src={ViewIcon} alt="ViewIcon" width={20} />View</a>
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
        </>
    )
}
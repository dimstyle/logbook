import AdminNavbar from "../../Components/Admin/Navbar.js";
import React, { useState, type ChangeEvent } from "react";
import ProfileIcon from "../../../../assets/download-removebg-preview.png"
import { Link } from "@inertiajs/react";

interface User {
    name: string,
    school: string,
    major: string,
    attendance: string,
    wfo: boolean,
    report: boolean,
    clockOut: boolean,
    time: string,
    date: string
}

const MOCK_USER: User[] = [
    { name: "Udin", school: "SMK Letris 2 Pamulang", major: "Rekayasa Perangkat Lunak", attendance: "Hadir", wfo: true, report: true, clockOut: true, time: "07:00" , date: "Today" },
    { name: "Tono", school: "SMK Letris 2 Pamulang", major: "Rekayasa Perangkat Lunak", attendance: "Sakit", wfo: false, report: false, clockOut: false, time: "08:00" , date: "Today" },
    { name: "Tony", school: "SMK Letris 2 Pamulang", major: "Rekayasa Perangkat Lunak", attendance: "Izin", wfo: false, report: false, clockOut: false, time: "08:20" , date: "Yesterday" },
    { name: "Ucup", school: "SMK Letris 2 Pamulang", major: "Rekayasa Perangkat Lunak", attendance: "Hadir", wfo: false, report: false, clockOut: false, time: "04:00" , date: "July, 10" },
    { name: "Ucok", school: "SMK Letris 2 Pamulang", major: "Rekayasa Perangkat Lunak", attendance: "Belum", wfo: false, report: false, clockOut: false, time: "01:00" , date: "July, 9" },
]

export default function DailyAttendance() {
    const [searchQuery, setSearchQuery] = useState<string>("");
    
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchQuery(event.target.value);
    }

    const filteredUser = MOCK_USER.filter((user) => {
        const lowercaseQuery = searchQuery.toLocaleLowerCase();
        return (
            user.name.toLocaleLowerCase().includes(lowercaseQuery) ||
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
                    <a href="/admin/user_list" className="p-1">Users</a>
                    <a href="/admin/user_registration" className="p-1">Registration</a>
                    <a href="" className="bg-white text-black p-1 rounded-lg">Attendance</a>
                </div>
            </AdminNavbar>
            <div className="flex flex-col p-4 pt-30 gap-10">
                {filteredUser.length > 0 ? (
                    filteredUser.map((user) => {
                        const theAttendance = user.attendance
                        const isWFO = user.wfo
                        const isReport = user.report
                        const isClockOut = user.clockOut
                        
                        let userAttendance = ""
                        let attendanceBGcolor = ""
                        let attendanceTxtcolor = ""
                        let userWFO = isWFO ? "WFO" : "WFH"
                        let userReport = isReport ? "Sudah Laporan" : "Belum Laporan"
                        let userClockOut = isClockOut ? "Keluar" : "Belum Keluar"
                        let wfoBGcolor = isWFO ? "#DBEAFE" : "#F3E8FF"
                        let reportBGcolor = isReport ? "#B7FCCF" : "#EEEEEE"
                        let clockOutBGcolor = isClockOut ? "#B7FCCF" : "#EEEEEE"
                        let wfoTxtcolor = isWFO ? "#1D4ED8" : "#7E22CE"
                        let reportTxtcolor = isReport ? "#15803D" : "#6B7280"
                        let clockOutTxtcolor = isClockOut ? "#15803D" : "#6B7280"

                        if (theAttendance === "Hadir") {
                            userAttendance = "Hadir"
                            attendanceBGcolor = "#B7FCCF"
                            attendanceTxtcolor = "#15803D"
                        }
                        else if (theAttendance === "Sakit") {
                            userAttendance = "Sakit"
                            userWFO = "N/A"
                            userReport = "N/A"
                            userClockOut = "N/A"
                            attendanceBGcolor = "#F3E8FF"
                            attendanceTxtcolor = "#7E22CE"
                            wfoBGcolor = "#EEEEEE"
                            wfoTxtcolor = "#6B7280"
                            reportBGcolor = "#EEEEEE"
                            reportTxtcolor = "#6B7280"
                            clockOutBGcolor = "#EEEEEE"
                            clockOutTxtcolor = "#6B7280"
                        }
                        else if (theAttendance === "Izin") {
                            userAttendance = "Izin"
                            userWFO = "N/A"
                            userReport = "N/A"
                            userClockOut = "N/A"
                            attendanceBGcolor = "#DBEAFE"
                            attendanceTxtcolor = "#1D4ED8"
                            wfoBGcolor = "#EEEEEE"
                            wfoTxtcolor = "#6B7280"
                            reportBGcolor = "#EEEEEE"
                            reportTxtcolor = "#6B7280"
                            clockOutBGcolor = "#EEEEEE"
                            clockOutTxtcolor = "#6B7280"
                        }
                        else if (theAttendance === "Belum") {
                            userAttendance = "Belum Masuk"
                            userWFO = "N/A"
                            userReport = "N/A"
                            userClockOut = "N/A"
                            attendanceBGcolor = "#EEEEEE"
                            attendanceTxtcolor = "#6B7280"
                            wfoBGcolor = "#EEEEEE"
                            wfoTxtcolor = "#6B7280"
                            reportBGcolor = "#EEEEEE"
                            reportTxtcolor = "#6B7280"
                            clockOutBGcolor = "#EEEEEE"
                            clockOutTxtcolor = "#6B7280"
                        }

                        return (
                            <Link 
                                key={user.name} 
                                href={`/admin/user-report/${encodeURIComponent(user.name)}`}
                                data={{
                                    school: user.school,
                                    major: user.major,
                                    attendance: user.attendance,
                                    wfo: user.wfo,
                                    report: user.report,
                                    clockOut: user.clockOut,
                                    time: user.time,
                                    date: user.date
                                }} 
                                className="flex w-full p-5 bg-[#FFFFFF] rounded-lg"
                            >
                                <img src={ProfileIcon} alt="UserIcon" width={130} />
                                <div className="flex flex-col w-full justify-center gap-3 ml-2">
                                    <h1 className="text-2xl">{user.name}</h1>
                                    <div className="flex gap-2">
                                        <h2>{user.school}</h2>
                                        <h1>•</h1>
                                        <h2>{user.major}</h2>
                                    </div>
                                    <div className="flex gap-3">
                                        <span style={{backgroundColor: attendanceBGcolor, color: attendanceTxtcolor}} className="flex justify-center items-center p-1 rounded-lg">{userAttendance}</span>
                                        <span style={{backgroundColor: wfoBGcolor, color: wfoTxtcolor}} className="flex justify-center items-center p-1 rounded-lg">{userWFO}</span>
                                        <span style={{backgroundColor: reportBGcolor, color: reportTxtcolor}} className="flex justify-center items-center p-1 rounded-lg">{userReport}</span>
                                        <span style={{backgroundColor: clockOutBGcolor, color: clockOutTxtcolor}} className="flex justify-center items-center p-1 rounded-lg">{userClockOut}</span>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full items-end">
                                    <p className="text-[#6B7280]">{user.time}</p>
                                    <p className="text-[#6B7280]">{user.date}</p>
                                </div>
                            </Link>
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
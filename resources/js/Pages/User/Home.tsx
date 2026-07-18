import { useState, type ChangeEvent } from "react";
import UserNavbar from "../../Components/User/UserNavbar.js";

interface User {
    activity: string;
    clockin: string;
    clockout: string;
    date: string;
    actions: string;
}

const MOCK_USERS: User[] = [
    { activity: "Membuat website", clockin: "08.00", clockout: "16.00", date: "today", actions: "/edit_report"},
    { activity: "Membuat sabun", clockin: "04.00", clockout: "23.00", date: "9-11-2011", actions: "/view_report"},
    { activity: "Membuat dimsum", clockin: "02.00", clockout: "22.00", date: "9-11-2021", actions: "/view_report"},
    { activity: "Membuat roket", clockin: "04.00", clockout: "21.00", date: "9-11-2031", actions: "/view_report"},
    { activity: "Membuat mobil", clockin: "02.00", clockout: "23.00", date: "9-11-2041", actions: "/view_report"},
    { activity: "Membuat motor", clockin: "03.00", clockout: "21.00", date: "9-11-2051", actions: "/view_report"},
    { activity: "Membuat masalah", clockin: "05.00", clockout: "17.00", date: "9-11-2061", actions: "/view_report"},
    { activity: "Membuat kebakaran", clockin: "06.00", clockout: "18.00", date: "9-11-2071", actions: "/view_report"}
]

export default function Home(){
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setSearchQuery(event.target.value);
    }

    const filteredUser = MOCK_USERS.filter((history) => {
        const lowercaseQuery = searchQuery.toLocaleLowerCase();
        return (
            history.activity.toLocaleLowerCase().includes(lowercaseQuery) ||
            history.clockin.toLocaleLowerCase().includes(lowercaseQuery) ||
            history.clockout.toLocaleLowerCase().includes(lowercaseQuery) ||
            history.date.toLocaleLowerCase().includes(lowercaseQuery)
        )
    })

    return(
        <>
            <UserNavbar 
                index={1}
                input
                inputValue={searchQuery}
                inputplaceholder="Search Report"
                onChangeHandler={handleSearchChange}
            />
            <div className="p-4 pt-30">
                <span className="bg-[#FF5454] text-white p-2 inline-block mb-5 rounded-lg cursor-pointer">Export as PDF</span>
                <table className="min-w-full border-collapse divide-y divide-white-100 bg-[#838383] text-white">
                    <thead className="bg-[#505050]">
                        <tr className="divide-x divide-white-100">
                            <th>Activities</th>
                            <th>Clock In</th>
                            <th>Clock Out</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center divide-y divide-white-100">
                        {filteredUser.length > 0 ? (
                            filteredUser.map((user) => {
                                const isToday = user.date === "today"
                                const linktext = isToday ? "Edit" : "View";
                                const linkcolor = isToday ? "#FF5454" : "#1D4ED8";
                                
                                return (
                                    <tr className="divide-x divide-white-100 h-20">
                                        <td>{user.activity}</td>
                                        <td>{user.clockin}</td>
                                        <td>{user.clockout}</td>
                                        <td>{user.date}</td>
                                        <td>
                                            <a href={user.actions} style={{backgroundColor: linkcolor}} className="rounded-lg p-1.5 cursor-pointer">{linktext}</a>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center text-xl items-center h-20">No History Found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}
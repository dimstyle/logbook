import Navbar from "../../Components/User/Navbar.js";

export default function Home(){
    return(
        <>
            <Navbar>
                <div className="w-full justify-start">
                    <input className="w-70 p-1.5 bg-white rounded-lg" type="text" placeholder="Search Reports" />
                </div>
                <div className="flex gap-2 items-center w-60 mr-2 text-white">
                    <a href="" className="bg-white text-black p-1 rounded-lg">History</a>
                    <a href="/clock-in" className="p-1">Attendance</a>
                    <a href="/login" className="p-1">Logout</a>
                </div>
            </Navbar>
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
                        <tr className="divide-x divide-white-100 h-20">
                            <td>Membuat website</td>
                            <td>08.00</td>
                            <td>16.00</td>
                            <td>9-11-2001</td>
                            <td>
                                <a href="/edit_report" className="bg-[#FF5454] rounded-lg p-1.5 cursor-pointer">Edit</a>
                            </td>
                        </tr>
                        <tr className="divide-x divide-white-100 h-20">
                            <td>Membuat website</td>
                            <td>08.00</td>
                            <td>16.00</td>
                            <td>9-11-2001</td>
                            <td>
                                <a href="/view_report" className="bg-[#1D4ED8] rounded-lg p-1.5 cursor-pointer">View</a>
                            </td>
                        </tr>
                        <tr className="divide-x divide-white-100 h-20">
                            <td>Membuat website</td>
                            <td>08.00</td>
                            <td>16.00</td>
                            <td>9-11-2001</td>
                            <td>
                                <a href="/view_report" className="bg-[#1D4ED8] rounded-lg p-1.5 cursor-pointer">View</a>
                            </td>
                        </tr>
                        <tr className="divide-x divide-white-100 h-20">
                            <td>Membuat website</td>
                            <td>08.00</td>
                            <td>16.00</td>
                            <td>9-11-2001</td>
                            <td>
                                <a href="/view_report" className="bg-[#1D4ED8] rounded-lg p-1.5 cursor-pointer">View</a>
                            </td>
                        </tr>
                        <tr className="divide-x divide-white-100 h-20">
                            <td>Membuat website</td>
                            <td>08.00</td>
                            <td>16.00</td>
                            <td>9-11-2001</td>
                            <td>
                                <a href="/view_report" className="bg-[#1D4ED8] rounded-lg p-1.5 cursor-pointer">View</a>
                            </td>
                        </tr>
                        <tr className="divide-x divide-white-100 h-20">
                            <td>Membuat website</td>
                            <td>08.00</td>
                            <td>16.00</td>
                            <td>9-11-2001</td>
                            <td>
                                <a href="/view_report" className="bg-[#1D4ED8] rounded-lg p-1.5 cursor-pointer">View</a>
                            </td>
                        </tr>
                        <tr className="divide-x divide-white-100 h-20">
                            <td>Membuat website</td>
                            <td>08.00</td>
                            <td>16.00</td>
                            <td>9-11-2001</td>
                            <td>
                                <a href="/view_report" className="bg-[#1D4ED8] rounded-lg p-1.5 cursor-pointer">View</a>
                            </td>
                        </tr>
                        <tr className="divide-x divide-white-100 h-20">
                            <td>Membuat website</td>
                            <td>08.00</td>
                            <td>16.00</td>
                            <td>9-11-2001</td>
                            <td>
                                <a href="/view_report" className="bg-[#1D4ED8] rounded-lg p-1.5 cursor-pointer">View</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
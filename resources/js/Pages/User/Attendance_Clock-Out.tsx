import Navbar from "../../Components/User/Navbar.js";

export default function ClockOut() {
    return (
        <div>
            <Navbar>
                <div className="w-full justify-start" />
                <div className="flex gap-2 items-center w-60 mr-2 text-white">
                    <a href="/" className="p-1">History</a>
                    <a href="" className="bg-white text-black p-1 rounded-lg">Attendance</a>
                    <a href="/login" className="p-1">Logout</a>
                </div>
            </Navbar>
        </div>
    )
}
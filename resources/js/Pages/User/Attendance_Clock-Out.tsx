import Navbar from "../../Components/User/Navbar.js";

const ClockOut = () => {
    return (
        <div>
            <Navbar>
                <input className="w-70 p-1.5 bg-white rounded-lg" type="text" placeholder="Search Reports" />
                <div className="flex justify-between items-center w-60 mr-2 text-white">
                    <a href="/" className="p-1">History</a>
                    <a href="" className="bg-white text-black p-1 rounded-lg">Attendance</a>
                    <a href="/login" className="p-1">Logout</a>
                </div>
            </Navbar>
        </div>
    )
}

export default ClockOut;
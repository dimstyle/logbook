import UserNavbar from "../../Components/User/UserNavbar.js";
import Image from "../../../../assets/image-picture-svgrepo-com.png"

export default function ViewReport() {
    return (
        <>
            <UserNavbar />
            
            <div className="flex flex-col items-center p-4 pt-30 w-full">
                <h1 className="text-2xl">View Report</h1>
                <div className="flex flex-col w-170 gap-5">
                    <h2 className="mt-10">Kegiatan</h2>
                    <input type="text" className="w-full h-28 p-1.5 bg-[#838383] rounded-lg cursor-not-allowed" disabled/>
                    <h2>Jam Masuk</h2>
                    <input type="text" className="w-full p-1.5 bg-[#838383] rounded-lg cursor-not-allowed" disabled/>
                    <h2>Jam Pulang</h2>
                    <input type="text" className="w-full p-1.5 bg-[#838383] rounded-lg cursor-not-allowed" disabled/>
                    <h2>Tanggal</h2>
                    <input type="date" className="w-50 p-1.5 bg-[#838383] rounded-lg cursor-not-allowed" disabled/>
                    <h2>Dokumentasi</h2>
                    <span className="flex justify-center items-center bg-[#838383] w-50 h-50 rounded-lg cursor-not-allowed">
                        <img src={Image} alt="" width={100}/>
                    </span>
                    <div className="flex justify-center mt-5 mb-10">
                        <a href="/" className="flex justify-center items-center bg-[#FF5454] w-30 h-8 rounded-lg p-1.5 cursor-pointer text-white ">Done</a>
                    </div>
                </div>
            </div>
        </>
    )
}
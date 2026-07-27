import { useState } from "react"
import SlideButton from '../../Components/Admin/SlideButton.js';
import AdminNavbar from "../../Components/Admin/AdminNavbar.js";
import UserExcelRegistration from "./User_Excel_Register.js";
import UserRegistration from "./User_Registration.js";

export default function Register(){
    const [isExcelMode, setIsExcelMode] = useState(false)
    return (
        <>
            <AdminNavbar index={2} />
            <SlideButton isExcelMode={isExcelMode} setIsExcelMode={setIsExcelMode} />

            {
                isExcelMode ? <UserExcelRegistration /> : <UserRegistration />
            }
        </>
    )
}
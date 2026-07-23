import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import ProfileIcon from "../../../../assets/download-removebg-preview.png"
import api from '../../lib/axios.js';
import type { getUserProfilePhoto } from '../../types/user.js';
import LoadingPage from '../../Pages/ui/LoadingPage.js';
import ErrorPage from '../../Pages/ui/ErrorPage.js';

interface inputHeaderConfig {
    index?: number,
    inputValue?: string,
    input?: boolean,
    inputplaceholder?: string,
    onChangeHandler?: (event: ChangeEvent<HTMLInputElement>)=>void,
}

export default function AdminNavbar({
    index = 0,
    input = false, 
    inputValue = "" ,
    inputplaceholder = "", 
    onChangeHandler = ()=>{}

}:inputHeaderConfig ) {
    index--;

    const isFetched = useRef(false);
    const [url, setUrl] = useState<string | null>(null)
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // logout event
    const LogoutEvent = async ()=> await api.post('/api/auth/logout');

    // array of hyper link
    const menus = [
        { name: "Users", href: "/admin/user_list" , onClick: ()=>{}},
        { name: "Registration", href: "/admin/user_registration", onClick: ()=>{} },
        { name: "Attendance", href: "/admin/daily_attendance", onClick: ()=>{} },
        { name: "Logout", href:"/admin/login", onClick : LogoutEvent },
    ];

    useEffect(()=>{
        if (isFetched.current) return;
        isFetched.current = true;

        ;(async()=>{
             try{
                const response = await api.get<getUserProfilePhoto>('/api/user/getuserprofilephoto');
                const photoUrl = response.data.url;
                
                setUrl(photoUrl ? `http://localhost:8000/storage/${photoUrl}` : null);
            }catch(err: unknown){
                const axiosError = err as { response?: { data?: { message?: string }; status?: number }; message?: string };
                const message = axiosError?.response?.data?.message ?? axiosError?.message ?? 'Something went wrong';
                const status = axiosError?.response?.status ?? 500;

                setError(JSON.stringify({ message, status }));
            }finally{
                setLoading(false)
            }
        })()
    });
    
    if(loading) return <LoadingPage />
    
    if (error){
        const errMessage = JSON.parse(error);
        return <ErrorPage errorMessage={errMessage} backPath="/login"/>
    }

    return(
        <>
            <nav className="bg-[#FF5454] shadow-[0px_0px_10px_black] fixed z-1000 w-full p-3 px-6 flex items-center">
                {/* Logo */}
                <div className="flex flex-1 items-end">
                    <h1 className="font-freckle text-3xl text-white">Logbook</h1>
                    <h1 className="font-freckle text-xl text-[#560000]">Admin</h1>
                </div>

                {/* Search */}
                <div className="flex flex-1 justify-center">
                    {input && (
                        <input
                            className="w-70 p-1.5 bg-white rounded-lg"
                            type="text"
                            placeholder={inputplaceholder}
                            value={inputValue}
                            onChange={onChangeHandler}
                        />
                    )}
                </div>

                {/* Menu + Profile */}
                <div className="flex justify-end items-center gap-4">
                    {/* link render */}
                    {menus.map((menu, i) => (
                        <a
                            key={menu.name}
                            href={menu.href}
                            onClick={menu.onClick}
                            className={`p-1 rounded-lg transition-colors ${
                                index === i
                                    ? "bg-white text-black"
                                    : "text-white"
                            }`}
                        >
                            {menu.name}
                        </a>
                    ))}
                    <a href="/admin/profile">
                        <img src={url || ProfileIcon} alt="UserIcon" width="70rem" />
                    </a>
                </div>
            </nav>
        </>
    )
}
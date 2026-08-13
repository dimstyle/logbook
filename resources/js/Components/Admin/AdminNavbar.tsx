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
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    if(loading) return <LoadingPage />
    
    if (error){
        const errMessage = JSON.parse(error);
        return <ErrorPage errorMessage={errMessage} backPath="/login"/>
    }

    return(
        <>
            <nav className="bg-[#FF5454] shadow-[0px_0px_10px_black] fixed z-1000 w-full h-20 p-3 px-6 flex items-center">
                {/* Logo */}
                <div className="flex items-end">
                    <h1 className="font-freckle text-3xl text-white">Logbook</h1>
                    <h1 className="font-freckle text-xl text-[#560000]">Admin</h1>
                </div>

                {/* Search */}
                <div className="absolute left-1/2 -translate-x-1/2">
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
                <div className="ml-auto flex items-center gap-5">
                    {/* Desktop menu */}
                    <div className="hidden lg:flex items-center gap-5">
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
                    </div>
                    {/* Mobile/tablet hamburger */}
                    <div ref={menuRef} className="lg:hidden relative">
                        <button
                            type="button"
                            onClick={() => setMenuOpen(prev => !prev)}
                            className={`text-white rounded-lg p-2 ${
                                menuOpen 
                                    ? "bg-black/30"
                                    : ""
                            }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-7 h-7"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                        </button>
                        {menuOpen && (
                            <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg">
                                {menus.map((menu, i) => (
                                    <a
                                        key={menu.name}
                                        href={menu.href}
                                        onClick={() => {
                                            menu.onClick();
                                            setMenuOpen(false);
                                        }}
                                        className={`block px-4 py-3 ${
                                            index === i
                                                ? "bg-gray-200 text-black"
                                                : "text-black hover:bg-gray-100"
                                            }`}
                                    >
                                        {menu.name}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Profile */}
                    <a href="/admin/profile">
                        <img
                            className="rounded-full object-cover aspect-square max-h-14 max-w-14"
                            src={url || ProfileIcon}
                            alt="UserIcon"
                        />
                    </a>
                </div>
            </nav>
        </>
    )
}
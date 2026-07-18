import type { ChangeEvent } from 'react';
import ProfileIcon from "../../../../assets/download-removebg-preview.png"
import api from '../../lib/axios.js';

interface inputHeaderConfig {
    index?: number,
    inputValue?: string,
    input?: boolean,
    inputplaceholder?: string,
    onChangeHandler?: (event: ChangeEvent<HTMLInputElement>)=>void,
}

export default function UserNavbar({
    index = 0,
    input = false, 
    inputValue = "" ,
    inputplaceholder= "" ,
    onChangeHandler = ()=>{}

}:inputHeaderConfig ) {
    index--;
    // logout event
    const LogoutEvent = async ()=> await api.post('/api/auth/logout');

    // array of hyper link
    const menus = [
        { name: "History", href: "/" , onClick: ()=>{}},
        { name: "Attendance", href: "/clock-in", onClick: ()=>{} },
        { name: "Logout", href:"/login", onClick : LogoutEvent },
    ];

    return(
        <>
            <nav className="bg-[#FF5454] shadow-[0px_0px_10px_black] fixed z-1000 w-full p-3 px-6 flex items-center">
                {/* Logo */}
                <div className="flex flex-1 items-end">
                    <h1 className="font-freckle text-3xl text-white">Logbook</h1>
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
                <div className="flex flex-1 justify-end items-center gap-5">
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
                    <a href="/user_profile">
                        <img src={ProfileIcon} alt="UserIcon" width="70rem" />
                    </a>
                </div>
            </nav>
        </>
    )
}
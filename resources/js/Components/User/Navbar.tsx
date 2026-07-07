import type { PropsWithChildren } from 'react';
import ProfileIcon from "../../../../assets/download-removebg-preview.png"

export default function Navbar({ children }: PropsWithChildren) {
    return(
    <>
        <nav className="bg-[#FF5454] shadow-[0px_0px_10px_black] fixed w-full m-0 p-3 px-6 flex justify-between items-center">
            <h1 className="font-freckle text-3xl text-white">Logbook</h1>
            <div className='flex items-center w-200 justify-between ml-auto'>{children}</div>
            <img src={ProfileIcon} alt="UserIcon" width={"70rem"} />
        </nav>
    </>
    )
}
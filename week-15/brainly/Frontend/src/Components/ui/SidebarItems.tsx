import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom';
export function SidebarItems({ text, icon, className, open, setOpen, link, onClick }: {
    text: string;
    icon: ReactElement;
    className?: string;
    open?: boolean;
    setOpen?: (open: boolean) => void;
    link?: string;
    onClick?: () => void;
}) {

   
    return (
        // <Link to={link || "#"} >
            <div className={`flex gap-3  ${open ? "px-1 justify-center " : "pl-4"} font-normal  py-2 hover:rounded-md  cursor-pointer ${className}`} onClick={onClick}>

                {icon}

                <span className={`text-gray-700 font-semibold ${open ? "hidden" : "block"} transition-all duration-300 ease-in-out text-[16px]`}>
                    {text}
                </span>
            </div>
        // </Link>
    )
}
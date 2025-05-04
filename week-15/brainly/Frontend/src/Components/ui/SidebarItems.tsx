import React, { ReactElement } from 'react'
export function SidebarItems({ text, icon, className }: {
    text: string;
    icon: ReactElement;
    className?: string;
}) {
    return (
        <div className={`flex gap-3 hover:bg-purple-500 pl-4 font-normal px-2 py-2 hover:rounded-md cursor-pointer ${className}`} >
            {icon} {text}
        </div>
    )
}
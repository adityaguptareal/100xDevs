import { Brain, CircleEllipsis, FileMinus, Twitter, Youtube, } from "lucide-react";
import { SidebarItems } from "./SidebarItems";

export function Sidebar() {
    return (
        <div className="h-screen bg-white absolute left-0 right-0  border-r border-gray-200 w-64 flex flex-col gap-4 p-4">
            <div id="logo" className="flex justify-start items-center gap-2 text-2xl font-bold text-purple-700">
            <Brain size={40} color="#5046E4" /> SecondBrain

            </div>
            <div className="flex flex-col gap-4 mt-4">

            <SidebarItems icon={ <Twitter />} text="Twitter" />
            <SidebarItems icon={<Youtube />} text="Youtube" />
            <SidebarItems icon={<FileMinus />} text="Docuemts" />
            <SidebarItems icon={ <CircleEllipsis />} text="Others" />
            </div>
        </div>
    )
}
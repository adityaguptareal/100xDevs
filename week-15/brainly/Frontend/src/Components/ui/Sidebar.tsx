import { Brain, CircleEllipsis, FileMinus, ListCollapse, NotebookText, Twitter, Youtube } from "lucide-react";
import { SidebarItems } from "./SidebarItems";
import { useContext, useState } from "react";
import { DashboardContext } from "../../Context/DashboardContext";
import { SidebarContext } from "../../Context/SidebarContext"; // Ensure SidebarContext is imported

export function Sidebar() {
    const { open, setOpen } = useContext(SidebarContext); 
    const { content, setContent, originalContent } = useContext(DashboardContext); 

    const sideBarContent = [
        {
            text: "All Content",
            icon: <NotebookText />,
            onClick: () => setContent(originalContent)
        },
        {
            text: "Twitter",
            icon: <Twitter />,
            onClick: () => setContent(originalContent.filter(item => item.type === "twitter")) 
        },
        {
            text: "Youtube",
            icon: <Youtube />,
            onClick: () => setContent(originalContent.filter(item => item.type === "youtube")) // Filter Youtube content
        },
        {
            text: "Documents",
            icon: <FileMinus />,
            onClick: () => setContent(originalContent.filter(item => item.type === "document")) // Filter Document content
        },
        {
            text: "Others",
            icon: <CircleEllipsis />,
            onClick: () => setContent(originalContent.filter(item => item.type === "other")) // Filter Other content
        }
    ]

    return (
        <div className={`h-full bg-white fixed z-10 left-0 border-r border-gray-200 ${open ? "w-20 overflow-hidden" : "w-60"} flex flex-col gap-4 p-4`}>
            <div id="logo" className="border-b-[1px] border-gray-300 h-fit pb-2 flex justify-start relative cursor-pointer w-full gap-2 text-2xl font-bold text-purple-700">
                <Brain size={40} color="#5046E4" />
                <span className={`cursor-pointer ${open ? "hidden" : "block"}`}>Brainz</span>
                <div className="">
                </div>
            </div>
            <div className="flex-1">
                <div className="flex flex-col gap-4 mt-4 justify-start">

                    {sideBarContent.map((item, index) => (
                        <SidebarItems
                            key={index}
                            icon={item.icon}
                            text={item.text}
                            open={open}
                            setOpen={setOpen}
                            onClick={item.onClick || undefined}
                            className="hover:bg-purple-500"
                        />
                    ))}
                </div>
            </div>

            {/* Closing Item */}
            <SidebarItems icon={<ListCollapse />} text="Close Sidebar" className=" text-gray-60 transition-all" open={open} setOpen={setOpen} onClick={() => setOpen(!open)} />


        </div>
    )
}
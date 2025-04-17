import React, { useState, createContext, useContext } from "react";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { IoLogoAngular, IoMdMore } from "react-icons/io";
import { RiAngularjsLine } from "react-icons/ri";

const SidebarContext = createContext();

export function Sidebar({ setActivePage }) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("home"); // Active Page Track karega

  const handlePageChange = (page) => {
    setActivePage(page);  // Dashboard ko notify karega
    setActiveTab(page);   // Active tab update karega
  };

  return (
    <aside className="h-screen">
      <nav className={`h-full flex flex-col gap-4 bg-white border-r shadow-sm py-4 px-0`}>
        {/* Sidebar Header */}
        <div className={`p-2 pb-2 flex text-xl ${isOpen ? "justify-between" : "justify-center"} items-center`}>
          <span className={`text-blue-500 gap-2 text-3xl flex items-center ${isOpen ? "w-fit ml-2" : "w-0 ml-0"} transition-all ease-in-out overflow-hidden`}>
            <IoLogoAngular color="red" />
            Angular
          </span>
          <button className="cursor-pointer text-gray-700" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaAnglesRight size={20} /> : <FaAnglesLeft size={20} />}
          </button>
        </div>

        {/* Sidebar Context Provider */}
        <SidebarContext.Provider value={{ isOpen, activeTab, handlePageChange }}>
          <ul className="flex-1 px-3 relative">
            <SidebarItem text="Home" icon={<IoLogoAngular />} page="home" />
            <SidebarItem text="Profile" icon={<RiAngularjsLine />} page="profile" />
            <SidebarItem text="AI Feature" icon={<IoMdMore />} page="ai" alert={true} />
          </ul>
        </SidebarContext.Provider>

        {/* User Profile */}
        <div className="border-t box-border w-full border-gray-300 flex p-3">
          <span className="rounded-full p-2 bg-red-600">
            <RiAngularjsLine size={30} />
          </span>
          <div className={`flex justify-between gap-1 items-center leading-3 overflow-hidden ${isOpen ? "w-fit" : "w-0"} transition-all ease-in-out`}>
            <div className="ml-2">
              <div className="font-semibold text-slate-700">Angular</div>
              <div className="text-xs mt-1 text-slate-600">Angular@gmail.com</div>
            </div>
            <span className="cursor-pointer text-slate-800">
              <IoMdMore size={20} />
            </span>
          </div>
        </div>
      </nav>
    </aside>
  );
}

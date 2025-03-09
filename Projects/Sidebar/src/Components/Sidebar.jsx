import React, { useContext } from "react";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { IoLogoAngular, IoMdMore } from "react-icons/io";
import { RiAngularjsLine } from "react-icons/ri";
const SidebarContext = React.createContext();


export function Sidebar({ children }) {
    const [isOpen, setIsOpen] = React.useState(true);

  return (
    <aside className="h-screen ">
      <nav className={`h-full flex flex-col  gap-4 bg-white border-r shadow-sm text-white font-semibold py-4 px-0`}>
        <div className={`p-2 pb-2 flex text-xl  ${isOpen?"justify-between":"justify-center"} items-center`}>
            <span className={`text-red-500 gap-1 text-2xl flex items-center ${isOpen?"w-fit ml-2":"w-0 ml-0"} transition-all ease-in-out overflow-hidden`}>
                <IoLogoAngular color="red"  />
            Angular
            </span>         
          <button
            className=" cursor-pointer text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaAnglesRight size={20} /> : <FaAnglesLeft size={20} />}
          </button>
        </div>
        <SidebarContext.Provider value={{ isOpen }}>
          <ul className="flex-1 px-3 relative">{children}</ul>
        </SidebarContext.Provider>
        <div className="border-t box-border w-full border-gray-300 flex p-3">
          <span className=" rounded-full p-2 bg-red-600">
            <RiAngularjsLine size={30} />
          </span>
          <div
            className={`flex justify-between gap-1 items-center leading-3 overflow-hidden ${
              isOpen ? "w-fit" : "w-0"
            } transition-all  ease-in-out`}
          >
            <div className={`ml-2 `}>
              <div className="font-semibold text-slate-700">Angular</div>
              <div className="text-xs mt-1 text-slate-600">
                Angular@gmail.com
              </div>
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
  export function SidebarItem({ text, icon, alert, active }) {
      const {isOpen} =useContext(SidebarContext)
      return (
          <li
          className={`flex relative  items-center hover:bg-red-100 hover:text-red-700 gap-2 px-3 py-2 my-1 rounded-md text-lg cursor-pointer transition-all font-medium duration-300 ${
              active ? "bg-red-100 text-red-700" : "bg-none text-slate-700"
              }`}
              >
      {icon}
      <span className={`text-lg ${isOpen?"w-fit ml-3":"w-0 ml-0"}  overflow-hidden transition-all`}>{text}</span>
      {alert && (
          <div className={`absolute ${isOpen?"right-6":"top-2 right-2"} w-2 h-2 rounded bg-red-700`}></div>
        )}
    </li>
  );
}

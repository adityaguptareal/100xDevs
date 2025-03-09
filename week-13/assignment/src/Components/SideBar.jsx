import React from 'react'
import Meeting from '../assets/Meeting';
import { House, ReceiptText, Settings, TvMinimalPlay, UsersRound } from 'lucide-react';

function SideBar() {
  return (
    <div className="h-screen w-[20%] md:w-[50%] lg:w-[20%] hidden md:block  bg-white p-4  text-white">
      <div className="w-full px-3 py-4 flex justify-between items-center">
        <div className="flex justify-center items-center bg-green-700 w-fit p-2 rounded-md gap-2 ">
          <div>
            <Meeting />
          </div>
          <div>
            Webinar <span className="text-white">.gg</span>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-[40px] h-[40px]  rounded-md"
          alt=""
        />
      </div>
      {/* Menu Items */}
      <ul className="w-full mt-5 px-2">
        <li className="flex justify-between text-gray-800 py-3 rounded-md items-center bg-green-300 cursor-pointer hover:text-white hover:bg-green-700 px-2 my-3">
          Home <House />
        </li>
        <li className="flex justify-between text-gray-800 py-3 rounded-md items-center cursor-pointer hover:text-white hover:bg-green-700 px-2 my-3">
          Webinars
          <TvMinimalPlay />
        </li>
        <li className="flex justify-between text-gray-800 py-3 rounded-md items-center cursor-pointer hover:text-white hover:bg-green-700 px-2 my-3">
          Billings
          <ReceiptText />
        </li>
        <li className="flex justify-between text-gray-800 py-3 rounded-md items-center cursor-pointer hover:text-white hover:bg-green-700 px-2 my-3">
          User Management
          <UsersRound />
        </li>
        <li className="flex justify-between text-gray-800 py-3 rounded-md items-center cursor-pointer hover:text-white hover:bg-green-700 px-2 my-3">
          Setting <Settings />
        </li>
      </ul>
    </div>
  );
}


export default SideBar

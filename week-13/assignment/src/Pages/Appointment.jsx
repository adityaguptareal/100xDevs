import React from "react";
import Meeting from "../components/icons/Meeting";
import {
  CalendarDays,
  ChevronDown,
  FileMusic,
  House,
  MoveLeft,
  MoveRight,
  Plus,
  ReceiptText,
  Settings,
  TvMinimalPlay,
  UsersRound,
  Video,
} from "lucide-react";
function Appointment() {
  return (
    <div className="h-screen w-full flex ">
      <Sidebar />
      <MainContent />
    </div>
  );
}

function Sidebar() {
  return (
    <div className="h-screen w-[20%] bg-white p-4  text-white">
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

function MainContent() {
  return (
    <div className="h-screen w-full bg-blue-400">
      {/* Blackground image */}
      <img
        src="https://images.unsplash.com/photo-1491466424936-e304919aada7?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="w-full center h-[20%] object-cover"
        alt=""
      />

      <div className="w-full h-[80%] bg-slate-100 p-5 grid grid-cols-8 gap-9">
        {/* Card */}
        <div className="flex flex-col justify-center items-center h-fit col-span-8 md:col-span-2 bg-white px-4 py-6 rounded-lg -translate-y-20">
          <img
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-[150px] h-[150px] rounded-md"
            alt=""
          />
          <div className="py-4 flex flex-col justify-center items-center ">
            <p className="font-bold text-green-700 text-md">Prabhleen Kaur</p>
            <p className="text-sm text-gray-700 font-medium">
              prabhleenkaur@gmail.com
            </p>
            <p className="text-sm text-gray-700 font-medium">98897989889</p>
            <p className="text-sm text-gray-700 font-medium py-3">
              Delhi,India
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col  col-span-8 md:col-span-4  ">
          {/* header */}
          <div>
            <p>Monday, 14 October</p>
            <h1 className="font-bold text-2xl  py-3 text-green-900">
              Good Morning, Prabhleen! 👋{" "}
            </h1>
          </div>
          {/* Appointment Calander */}
          <div className="bg-white rounded-md p-6">
            <div className="flex justify-between px-2 py-2 bg-slate-100 rounded-md">
              <div className="flex items-center gap-3">
                <CalendarDays /> Monday, 14 October 2025 <ChevronDown />
              </div>
              <div className="flex cursor-pointer gap-3">
                <MoveLeft />
                <MoveRight />
              </div>
            </div>
            {/* Details */}
            <div className="flex flex-col">
              <AppointementDetails />
              <AppointementDetails />
              <AppointementDetails />
            </div>
          </div>
        </div>
        {/* Scheduling Button */}

            
        <SchedulingCard />
    
      </div>
    </div>
  );
}

function AppointementDetails() {
  return (
    <div className="flex  border-b-[1px] border-slate-600">
      <div className="flex gap-2 items-center  my-10 h-[5px]">
        <div className="flex flex-col p-4  items-start justify-center ">
          <div className="text-xl font-semibold text-slate-800">11:30 AM</div>
          <div className="text-sm">11:30 AM</div>
        </div>
        <span className="w-[2px] h-[50px] bg-green-800"></span>
        <div className="flex flex-col p-4 items-start justify-center">
          <div className="text-sm ">Live</div>
          <div className="text-xl font-semibold text-slate-800">UX Webinar</div>
        </div>
      </div>
    </div>
  );
}

function SchedulingCard() {
  return (
    <>
      <div className="bg-white col-span-8 md:col-span-2 flex flex-col mt-20 gap-3 justify-center items-start p-10 h-[300px] ">
        <div className="flex">
          <div className="w-fit flex justify-center items-center flex-col ">
            <div className="flex w-fit bg-green-500 p-4 text-white rounded-md cursor-pointer">
              <Video />
            </div>
            <div className=" text-center text-sm font-semibold text-slate-700 py-3">
              Schedule A Webinar
            </div>
          </div>
          <div className="w-fit flex justify-center items-center flex-col ">
            <div className="flex w-fit bg-green-500 p-4 text-white rounded-md cursor-pointer">
              <Plus />
            </div>
            <div className=" text-center text-sm font-semibold text-slate-700 py-3">
              Join A Webinar
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-fit flex justify-center items-center flex-col ">
            <div className="flex w-fit bg-green-500 p-4 text-white rounded-md cursor-pointer">
              <FileMusic />
            </div>
            <div className=" text-center text-sm font-semibold text-slate-700 py-3">
              Open Recording
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Appointment;

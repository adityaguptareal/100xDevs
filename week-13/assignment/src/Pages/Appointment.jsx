import React from "react";
import Meeting from "../assets/Meeting";
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
import SideBar from "../Components/SideBar";
import ProfileCard from "../Components/ProfileCard";
import ScheduleCard from "../Components/ScheduleCard";
import CreationMenu from "../CreationMenu";
function Appointment() {
  return (
    <div className="h-screen w-full flex  bg-slate-100">
     

      <SideBar />
    
     
      <MainContent />
    </div>
  );
}

function MainContent() {
  return (
    <div className="h-screen w-full bg-slate-100">
      {/* Blackground image */}
      <img
        src="https://images.unsplash.com/photo-1491466424936-e304919aada7?q=80&w=2338&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="w-full center h-[20%] object-cover"
        alt=""
      />

      <div className=" w-full h-[80%] bg-slate-100 p-5 grid grid-cols-8 place-items-center gap-9 ">
      <div className="flex  w:72 md:w-60  lg:w-72 flex-col justify-center items-center h-fit col-span-8 md:col-span-2 lg:col-span-2 bg-white px-4 py-6 rounded-lg transform -translate-y-5">
        {/* Card */}
        <ProfileCard />
        </div>

        {/* Main Content */}
        <div className="flex flex-col  col-span-8 md:col-span-4 lg:col-span-4  ">
          {/* header */}
          <div>
            <p>Monday, 14 October</p>
            <h1 className="font-bold text-2xl  py-3 text-green-900">
              Good Morning, Prabhleen! 👋{" "}
            </h1>
          </div>
          {/* Appointment Calander */}
          <div className="bg-white rounded-md p-2 md:p-5 lg:p-10">
          <ScheduleCard/>
          </div>
        </div>
        {/* Scheduling Button */}
        <div className="bg-white col-span-8 md:col-span-2 lg:col-span-2 flex flex-col mt-20 gap-3 justify-center rounded-md items-start p-5 md:p-10 h-[300px] ">

        <CreationMenu />
        </div>
      </div>
    </div>
  );
}





export default Appointment;

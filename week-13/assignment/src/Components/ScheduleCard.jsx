import { CalendarDays, ChevronDown, MoveLeft, MoveRight } from "lucide-react";
import React from "react";

function ScheduleCard() {
 
  const data = [
    {
      time: "11:30 AM",
      title: "UX Webinar",
      status: "Live"
    },
    {
      time: "1:00 PM",
      title: "Team Meeting",
      status: "Scheduled"
    },
    {
      time: "3:00 PM",
      title: "Project Review",
      status: "Completed"
    },
    {
      time: "4:30 PM",
      title: "Client Call",
      status: "Pending"
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center px-2 py-2 bg-slate-100 rounded-md ">
        <div className="flex items-center gap-3 text-[12px] md:text-lg justify-center ">
          <CalendarDays size={15} /> Monday, 14 October 2025 <ChevronDown />
        </div>
        <div className="flex justify-center items-centercursor-pointer gap-3">
          <MoveLeft size={15} />
          <MoveRight size={15} />
        </div>
      </div>
      {/* Details */}
    {data.map((item,index)=>{
      return(
        <>
      <div className="flex flex-col" key={index}>
      <div className="flex  border-b-[1px] border-slate-600 w-[260px] md:w-[500px] mx-auto">
        <div className="flex gap-2 items-center  my-10 h-[5px] w-full">
          <div className="flex flex-col p-2 md:p-4  items-start justify-center ">
            <div className="md:text-xl text-lg  font-semibold text-slate-800">
              {item.time}
            </div>
            <div className="md:text-sm text-xs">{item.time}</div>
          </div>
          <span className="w-[2px] h-[50px] bg-green-800"></span>
          <div className="flex flex-col p-4 items-start justify-center">
            <div className="text-xs md:text-sm ">{item.title}</div>
            <div className="text-lg md:text-xl font-semibold text-slate-800">
              UX Webinar
            </div>
          </div>
        </div>
      </div>
      </div>
      </>
    )})}
  
    </div>
  );
}

export default ScheduleCard;

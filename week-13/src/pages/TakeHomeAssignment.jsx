import React from "react";

function TakeHomeAssignment() {
  return (
    <div className="h-full w-full flex">
      <SideBar />
      <MainContent />
    </div>
  );
}

function SideBar() {
  return <div className="w-[20%] h-screen bg-slate-600">Sidebar</div>;
}

function MainContent() {
  return <div className="w-[80%] h-screen bg-slate-800">Main Content</div>;
}

export default TakeHomeAssignment;

import "./App.css";
import { useState } from "react";
import MenuBar from "./Components/Icons/MenuBar";
// import Assignments from "./pages/Assignments";
// import OTPSignup from "./pages/OTPSignup";

function App() {
  const [sidebar, setsidebar] = useState(true);
  return (
    <>
      <div className="flex h-full w-full">
        <Sidebar sidebar={sidebar} setsidebar={setsidebar} />
        <MainContent />
      </div>
    </>
  );
}

function Sidebar({ setsidebar, sidebar }) {
  return (
    <>
      <div
        className={`bg-blue-500   h-screen ${
          sidebar ? " w-full md:w-[15%]  " : "w-fit "
        } p-4 text-white  fixed top-0 left-0 z-10 md:relative `}
      >
        <div
          className=" cursor-pointer px-3 py-3"
          onClick={() => {
            setsidebar(!sidebar);
          }}
        >
          <MenuBar />
        </div>
        {sidebar && (
          <ul className="list-none gap-2">
            <li className="font-medium cursor-pointer hover:bg-sky-400 hover:rounded-md px-3 py-3">
              Home
            </li>
            <li className="font-medium cursor-pointer hover:bg-sky-400 hover:rounded-md px-3 py-3">
              Profile
            </li>
            <li className="font-medium cursor-pointer hover:bg-sky-400 hover:rounded-md px-3 py-3">
              Settings
            </li>
            <li className="font-medium cursor-pointer hover:bg-sky-400 hover:rounded-md px-3 py-3">
              Logout
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

function MainContent() {
  return (
    <>
      <div className=" w-full ">
        {/* Black Bar */}
        <div className="h-[15%] bg-black w-full"></div>
        {/* Appointentment Section */}
        <div className="grid grid-cols-8 gap-7 h-[85%] p-5">
          <div className="border border-slate-600 shadow shadow-slate-400  rounded-2xl  h-85 -translate-y-16 col-span-8 md:col-span-2 text-black">
            Gir Card
          </div>
          <div className="border border-slate-600 shadow shadow-slate-400   rounded-2xl h-85  md:col-span-4  col-span-8text-black">
            Gir Card
          </div>
          <div className="border border-slate-600 shadow shadow-slate-400  rounded-2xl  h-85  md:col-span-2 col-span-8 text-black">
            Gir Card
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

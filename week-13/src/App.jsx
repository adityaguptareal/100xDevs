import "./App.css";
// import { useState } from "react";
// import Assignments from "./pages/Assignments";
// import OTPSignup from "./pages/OTPSignup";

function App() {
  return (
    <>
      {/* <OTPSignup /> */}
      {/* <div className='flex w-screen h-screen'>

      <Assignments/>
      </div> */}
      <div className="w-screen h-screen flex justify-center flex-col items-center bg-white dark:bg-gray-900 text-black dark:text-white">
        <h1 className="text-xl font-bold text-center py-4 cursor-pointer">
          {" "}
          Aditya Kumar Gupta{" "}
        </h1>
        <button
          onClick={() => {
            document.querySelector("html").classList.toggle("dark");
          }}
          className="bg-accent p-3 cursor-pointer hover:bg-red-700 dark:hover:bg-blue-900 dark:bg-blue-600 font-bold rounded-lg"
        >
          Toggle Button
        </button>
      </div>
    </>
  );
}

export default App;

import { FileMusic, Plus, Video } from 'lucide-react'
import React from 'react'

function CreationMenu() {
  return (
    <div>
        <div className="flex gap-3 bg-white ">
          <div className="w-fit flex justify-center items-center flex-col  ">
            <div className="flex w-fit  bg-green-500 hover:bg-green-700 p-4 text-white  cursor-pointer">
              <Video />
            </div>
            <div className=" text-center text-xs hover:text-green-700 cursor-pointer font-semibold text-slate-700 py-3">
              schedule a webinar
            </div>
          </div>
          <div className="w-fit flex justify-center items-center flex-col ">
            <div className="flex w-fit bg-green-500 hover:bg-green-700 p-4 text-white rounded-md cursor-pointer">
              <Plus />
            </div>
            <div className=" text-center text-xs hover:text-green-700 cursor-pointer font-semibold text-slate-700 py-3">
              Join A Webinar
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-fit flex justify-center items-center flex-col ">
            <div className="flex w-fit bg-green-500 hover:bg-green-700 p-4 text-white rounded-md cursor-pointer">
              <FileMusic />

            </div>
            <div className=" text-center text-xs hover:text-green-700 cursor-pointer font-semibold text-slate-700 py-3">
              Open Recording
            </div>
          </div>
        </div>
      </div>
  )
}

export default CreationMenu

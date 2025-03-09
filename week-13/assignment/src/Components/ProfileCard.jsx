import React from 'react'

function ProfileCard() {
  return (
    <div className='  flex flex-col gap-y-4 items-center justify-center '>
     
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

  )
}

export default ProfileCard

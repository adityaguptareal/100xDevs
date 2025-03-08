import React from 'react'

function SideBar() {
  return (
    <div className=' flex h-full w-full'>
      <div className=' bg-red-700 w-0 md:w-[25%] transition-all duration-500 ease-in'>Sidebar</div>
      <div className='w-full h-screen md:w-[75%] bg-blue-700 text-white'>
        <div>Content</div>
      </div>
    </div>
  )
}

export default SideBar

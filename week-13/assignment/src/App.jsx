import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Appointment from './Pages/Appointment'
function App() {

  return (
    <>
     <div className='h-screen w-full'>
      <Appointment/>
     </div>
    </>
  )
}

export default App

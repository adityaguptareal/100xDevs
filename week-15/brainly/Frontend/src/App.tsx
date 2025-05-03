
import './App.css'
import { Plus } from './Components/ui/Icons/Plus.tsx'
import { Button } from './Components/ui/Button'
import { Share } from './Components/ui/Icons/Share'
import { Card } from './Components/ui/Card.tsx'
import { CreateContentModel } from './Components/ui/CreateContentModel.tsx'
import { useState } from 'react'
import { Sidebar } from './Components/ui/Sidebar.tsx'
function App() {

  const [modalopen, setModalopen] = useState(false)

  return (
   <div className='flex bg-slate-50 min-h-screen gap-4 p-4'>
    <Sidebar/>
    <div className=''>
      <div className='flex gap-3 items-center justify-end'>
    <Button
      variant='primary'
      size='medium'
      text='Add Content' onClick={()=>{setModalopen(true)}} startIcon={<Plus size='md'/>} />

      <Button
      variant='secondary'
      size='medium'
      text='Share brain' startIcon={<Share size='md'/>} />
      </div>


    <div className='grid grid-cols-4 gap-4 pt-10 ml-64'>
    <Card type='youtube' title='Gaming post' link={"https://www.youtube.com/watch?v=YvBaRWzOyqM"}/>
    <Card type='twitter' title='Vibe Coding' link={"https://x.com/mannupaaji/status/1917960933558620508"}/>
    <Card type='twitter' title='Web 3 Hackathon' link={"https://x.com/shubhxm_mishra/status/1918431355483848730"}/>
      </div>
    {modalopen && <CreateContentModel setModalopen={setModalopen}/>}

      
    
      </div>
   </div>
  )
}

export default App

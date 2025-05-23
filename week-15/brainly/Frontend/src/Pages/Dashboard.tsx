
import '../App.css'
import { Plus } from '../Components/ui/Icons/Plus.tsx'
import { Button } from '../Components/ui/Button'
import { Share } from '../Components/ui/Icons/Share'
import { Card } from '../Components/ui/Card.tsx'
import { CreateContentModel } from '../Components/ui/CreateContentModel.tsx'
import { useContext, useEffect, useState } from 'react'
import { Sidebar } from '../Components/ui/Sidebar.tsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import {DashboardContext} from '../Context/DashboardContenxt.tsx'


function Dashboard() {
    const { content, setContent } = useContext(DashboardContext);

  interface Content {
    _id: string;
    type: string;
    link: string;
    title: string;
  }
  const [modalopen, setModalopen] = useState(false)
  const navigate = useNavigate()

  // Page validation
  function pageValidation() {
    const token = localStorage.getItem("SecondBrainToken");
    const user = localStorage.getItem("SecondBrainUser");
    
    if (!token || !user) {
      localStorage.clear(); // Clear any partial auth data
      navigate("/signin");
      return;
    }
  }


  // getttingUserContent
  async function userContent() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/content`, {
        headers: { Authorization: localStorage.getItem("SecondBrainToken") },
      });

      const contentList = response.data.allContent;
      setContent(contentList);
    } catch (err) {
      toast.error("Error fetching content");
    }
  }


  useEffect(() => {
    pageValidation();
    userContent();

  }, []);



  return (
    <>
      <div className='flex bg-slate-50 min-h-screen gap-4 p-4'>
        <Sidebar />
        <div className='w-full'>
          <div className='flex gap-3 items-center justify-end'>
            <Button
              variant='primary'
              size='medium'
              text='Add Content' onClick={() => { setModalopen(true) }} startIcon={<Plus size='md' />} />

            <Button
              variant='secondary'
              size='medium'
              text='Share brain' startIcon={<Share size='md' />} />
          </div>


          <div className='grid grid-cols-4 gap-4 pt-10 ml-64'>
            {content.length == 0 ? <div className='text-center text-xl text-gray-800'> No any Content is Available</div> :
              content.map((item: Content) => (
                <Card
                  id={item._id}
                  key={item._id}
                  title={item.title}
                  type={item.type as "youtube" | "twitter"}
                  link={item.link}
                  refreshContent={userContent}
                />
              ))
            }


          </div>
          {modalopen && <CreateContentModel setModalopen={setModalopen} refreshContent={userContent} />}



        </div>
      </div>

    </>
  )
}

export default Dashboard
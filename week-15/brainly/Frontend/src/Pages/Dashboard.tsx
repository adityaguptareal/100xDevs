
import '../App.css'
import { Plus } from '../Components/ui/Icons/Plus.tsx'
import { Button } from '../Components/ui/Button'
import { Share } from '../Components/ui/Icons/Share'
import { Card } from '../Components/ui/Card.tsx'
import { CreateContentModel } from '../Components/ui/CreateContentModel.tsx'
import { useEffect, useState } from 'react'
import { Sidebar } from '../Components/ui/Sidebar.tsx'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'


function Dashboard() {

  interface Content {
    _id: string;
    type: string;
    link: string;
    title: string;
  }

  const [modalopen, setModalopen] = useState(false)
  const navigate = useNavigate()
  const [dashboardContent, setdashboardContent] = useState<Content[]>([])
  const [loading, setLoading] = useState(false) // Retained for potential future use


  // Page validation
  function pageValidation() {
    const jwtToken = localStorage.getItem("SecondBrainToken")
    if (!jwtToken) {
      navigate("/signup")
      return
    }
  }


  // getttingUserContent

  async function userContent() {
    setLoading(true);

    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/content`, {
        headers: { Authorization: localStorage.getItem("SecondBrainToken") },
      });


      const contentList = response.data.allContent
      setdashboardContent(contentList)
      console.log(contentList)
    } catch (err) {

      toast.error("Error fetching content")
    } finally {
      setLoading(false);  // reset loading state
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
        <div className=''>
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
            {dashboardContent.length == 0 ? <div className='text-center text-2xl text-gray-800'> No any Content is Available</div> :
              dashboardContent.map(content => (
                console.log(content),
                <Card
                  key={content._id}
                  title={content.title}
                  type={content.type as "youtube" | "twitter"}
                  link={content.link}
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
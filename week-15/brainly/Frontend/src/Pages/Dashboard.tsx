
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
// Removed unused import

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

      console.log("Response from backend:", response.data.allContent);
      const contentList = response.data.allContent
      setdashboardContent(contentList)
    } catch (err) {
      console.log("Error fetching content:", err);
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
            <Card type='youtube' title='Gaming post' link={"https://www.youtube.com/watch?v=YvBaRWzOyqM"} />
              <Card type='twitter' title='Vibe Coding' link={"https://x.com/mannupaaji/status/1917960933558620508"} />
          {dashboardContent.map(content => (
            <Card 
              key={content._id} 
              title={content.title} 
              type={content.type === "youtube" || content.type === "twitter" ? content.type : "youtube"} 
              link={content.link} 
            />
          ))}


          </div>
          {modalopen && <CreateContentModel setModalopen={setModalopen} />}



        </div>
      </div>

    </>
  )
}

export default Dashboard
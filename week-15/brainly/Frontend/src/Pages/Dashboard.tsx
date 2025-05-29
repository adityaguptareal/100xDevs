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
import { DashboardContext } from '../Context/DashboardContext.tsx'
import { SidebarContext } from '../Context/SidebarContext.tsx'
function Dashboard() {
  const { content, setContent, setOriginalContent } = useContext(DashboardContext);
  const { open, setOpen } = useContext(SidebarContext);
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
      setOriginalContent(contentList);
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
      <div className="flex flex-col min-h-screen bg-slate-50 md:flex-row gap-0 md:gap-4">
        <Sidebar />
        <div
          className={`flex-1 pt-4 transition-all duration-300 ${
        open ? "md:pl-24" : "md:pl-64"
          } px-2 sm:px-4`}
        >
          <div className="flex flex-col gap-3 items-stretch sm:flex-row sm:items-center sm:justify-end">
        <Button
          variant="primary"
          size="medium"
          text="Add Content"
          onClick={() => {
            setModalopen(true);
          }}
          startIcon={<Plus size="md" />}
        />

        <Button
          variant="secondary"
          size="medium"
          text="Share brain"
          startIcon={<Share size="md" />}
        />
          </div>

          {content.length === 0 ? (
        <div className="flex items-center justify-center w-full h-full py-10">
          <div className="text-center text-md text-gray-800">
            No any Content is Available
          </div>
        </div>
          ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {content.map((item: any) => (
            <Card
          id={item._id}
          key={item._id}
          title={item.title}
          type={item.type as "youtube" | "twitter"}
          link={item.link}
          refreshContent={userContent}
            />
          ))}
        </div>
          )}
          {modalopen && (
        <CreateContentModel
          setModalopen={setModalopen}
          refreshContent={userContent}
        />
          )}
        </div>
      </div>
    </>
  )
}

export default Dashboard
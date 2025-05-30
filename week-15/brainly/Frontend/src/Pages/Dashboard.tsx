import '../App.css';
import { Plus } from '../Components/ui/Icons/Plus';
import { Button } from '../Components/ui/Button';
import { Share } from '../Components/ui/Icons/Share';
import { Card } from '../Components/ui/Card';
import { CreateContentModel } from '../Components/ui/CreateContentModel';
import { useContext, useEffect, useState } from 'react';
import { Sidebar } from '../Components/ui/Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { DashboardContext } from '../Context/DashboardContext';
import { SidebarContext } from '../Context/SidebarContext';

interface DashboardContent {
  _id: string;
  type: 'youtube' | 'twitter'; // enforce known types
  link: string;
  title: string;
}

function Dashboard() {
  const { content, setContent, setOriginalContent } = useContext(DashboardContext);
  const { open } = useContext(SidebarContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const navigate = useNavigate();

  function pageValidation() {
    const token = localStorage.getItem('SecondBrainToken');
    const user = localStorage.getItem('SecondBrainUser');

    if (!token || !user) {
      localStorage.clear();
      navigate('/signin');
    }
  }

  async function userContent() {
    try {
      setLoading(true);
      const token = localStorage.getItem('SecondBrainToken');

      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: token ? `${token}` : '',
        },
      });

      const contentList: DashboardContent[] = response.data.allContent;
      setContent(contentList);
      setOriginalContent(contentList);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === 'string'
          ? err
          : 'Unknown error';
      setError(message);
      toast.error('Error fetching content');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    pageValidation();
    userContent();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 md:flex-row gap-0 md:gap-4">
      <Sidebar />
      <div
        className={`flex-1 pt-4 transition-all duration-300 ${
          open ? 'md:pl-24' : 'md:pl-64'
        } px-2 sm:px-4`}
      >
        <div className="flex flex-col fixed top-4 right-2 gap-3 items-stretch sm:flex-row sm:items-center sm:justify-end z-10">
          <Button
            variant="primary"
            size="medium"
            text="Add Content"
            onClick={() => setModalOpen(true)}
            startIcon={<Plus size="md" />}
          />
          <Button
            variant="secondary"
            size="medium"
            text="Share brain"
            startIcon={<Share size="md" />}
          />
        </div>

        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 pt-20 xl:grid-cols-4 gap-4 mt-4">
          {loading && (
            <div className="text-md text-center flex justify-center items-center col-span-full">
             <span className='text-center'> Content is loading ...</span>
            </div>
          )}
          {!loading &&
            content &&
            (content as DashboardContent[]).map((item: DashboardContent) => (
              <Card
                id={item._id}
                key={item._id}
                title={item.title}
                type={item.type}
                link={item.link}
                refreshContent={userContent}
              />
            ))}
        </div>

        {modalOpen && (
          <CreateContentModel
            setModalopen={setModalOpen}
            refreshContent={userContent}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;


import './App.css'
import Dashboard from './Pages/Dashboard'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import TweetCard from './Components/ui/TweetCard'

function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/tweets' element={<TweetCard />} />
        </Routes>
        <Toaster />
      </Router>

    </>
  )
}

export default App

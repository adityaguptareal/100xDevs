import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
    <div>
      <Link to="/">Allen |</Link> 
      <Link to="/Class11">Class 11 |</Link>
      <Link to="/Class12">Class 12 |</Link>
    </div>
        <Routes>
          <Route path='/' element={<Allen/>} />
          <Route path='/Class11' element={<Class11/>} />
          <Route path='/Class12' element={<Class12/>} />
        </Routes>
      </BrowserRouter>


    </>

  )

  function Allen() {
    return (
      <>
        <div>Welcome to the allen home page</div>
      </>

    )
  }

  function Class11() {
    return (
      <>
        <div>This is class 11th Program</div>
      </>
    )
  }
  function Class12() {
    return (
      <>
        <div>This is class 12th Program</div>
      </>
    )
  }
}

export default App

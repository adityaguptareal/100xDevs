import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// Removed incorrect WebSocket import

function App() {
  const [datavalue, setValue] = useState<string>('')
  const [socket,setsocket]=useState()
  function sendMessage(data: any) {
    // @ts-ignore
    socket.send(datavalue)

  }

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080')
    // @ts-ignore
    setsocket(ws)
    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = (e) => {
      alert(e.data);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }, [])

  return (
    <>
      <div>
        <input type="text" placeholder='Enter text' onChange={(e) => setValue(e.target.value)} value={datavalue} />
        <input type="button" value="Submit" onClick={sendMessage} />
      </div>
    </>
  )
}

export default App

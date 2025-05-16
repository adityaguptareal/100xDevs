
import { useEffect, useState } from 'react'
import './App.css'

function App() {
const [messages, setMessages] = useState(["hi there","whats up"])

useEffect(() => {
 
  const ws = new WebSocket("ws://localhost:8080")
  ws.onmessage=(event)=>{
    setMessages(m=>[...m,event.data])

  }

 
}, [])

  
  return (
  <>
  <div className='h-screen'>
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 text-center font-bold">
        Chat App
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        <div className="space-y-4">
          {/* Example messages */}
         {messages.map(message=>{
          return(
            <>
             <div className="flex justify-start">
            <div className="bg-white p-3 rounded-lg shadow-md max-w-xs">
              {message}
            </div>
          </div>
            </>
          )
         })}
          <div className="flex justify-end">
            <div className="bg-blue-500 text-white p-3 rounded-lg shadow-md max-w-xs">
              I'm good, thanks! How about you?
            </div>
          </div>
        </div>
      </div>

      {/* Input Box */}
      <div className="bg-white p-4 border-t flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border rounded-lg p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
    </div></>
  )
}

export default App

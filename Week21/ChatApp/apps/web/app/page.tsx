"use client"
import { TextInput } from "@repo/ui/TextInput"
import { useRouter } from "next/navigation"


export default function Home() {
  const route=useRouter()

  return (
    <>
      <div style={{ height: "98vh", overflow: "hidden", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", background: "black" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "10px" }}>
          <TextInput placeholder="Enter Room Id" />
          <button onClick={()=>{
            route.push("/chat/123")
          }}>Join Room</button>
        </div>
      </div>
    </>
  )
}
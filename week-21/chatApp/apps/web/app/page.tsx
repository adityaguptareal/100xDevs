"use client"
import TextInput from "@repo/ui/TextInput"
import Button from "@repo/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Home() {
  const [roomId, setroomId] = useState("")
  const router = useRouter()
  function handleChange(e: any) {
    setroomId(e.target.value)

  }
  function handleSubmit() {
    if (roomId.trim() == "") {
      alert("Please Enter Room id")
      return
    }
    else {
      router.push(`/chat/room/${roomId}`)
    }
  }
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "99vw", height: "100vh", background: "black", color: "white" }}>
      <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
        <TextInput onChange={handleChange} placeholder="Enter Room Id" />
        <Button onClick={handleSubmit}>Join Meeting</Button>
      </div>
    </div>
  )
}
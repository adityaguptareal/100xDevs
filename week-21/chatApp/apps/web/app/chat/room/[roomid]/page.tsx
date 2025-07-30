"use client";
import { useParams } from "next/navigation";

export default function ChatRoom() {
    const { roomid } = useParams();
    console.log(roomid)

    return (
        <div style={{ padding: "20px", fontSize: "20px", }}>
            Welcome to Room: <strong>{roomid}</strong>
        </div>
    );
}

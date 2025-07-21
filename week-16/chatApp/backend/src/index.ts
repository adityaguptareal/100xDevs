import { WebSocketServer,WebSocket } from "ws";
const ws = new WebSocketServer({ port: 8080 })
interface user {
    socket: WebSocket;
    room: string;
}

// code review

let allSockets: user[] = []
ws.on("connection", function (socket) {
socket.on("message",(message)=>{
    const parsedMessage=JSON.parse(message as unknown as string)
    if(parsedMessage.type=="join"){
        allSockets.push({
            // @ts-ignore
            socket,
            room:parsedMessage.payload.roomId
        })
        socket.send("you have joined the room"+parsedMessage.payload.roomId)
        console.log("you have joined the room"+parsedMessage.payload.roomId)
    }
    if(parsedMessage.type=="chat"){
       let userRoom=allSockets.find((record)=>record.socket==socket)?.room
       for(let i=0;i<allSockets.length;i++){
        if(allSockets[i].room==userRoom){
            allSockets[i].socket.send(parsedMessage.payload.message)
        }
       }
       
    }
})
})

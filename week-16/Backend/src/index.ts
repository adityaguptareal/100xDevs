import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 })
wss.on("connection", function (socket) {
    console.log("Socket connected")
    socket.on("message", (e) => {
       
    
        if (e.toLocaleString() == "ping"){
            socket.send("pong")
        }
    })
})
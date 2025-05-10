import { WebSocketServer } from "ws";
const ws = new WebSocketServer({ port: 8080 })
let userCount = 0
let alluser = []
ws.on("connection", function (socket) {
    alluser.push(socket)
    userCount += 1
    console.log("user connected # " + userCount)

    socket.on("message", (message) => {
        console.log("Message Received " + message.toString())
       for (let index = 0; index < alluser.length; index++) {
        const user = alluser[index];
        user.send(message.toString())
        
       }
    })
})
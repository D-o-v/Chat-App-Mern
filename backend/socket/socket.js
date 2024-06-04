import { Server } from "socket.io";
import http from "http"; //this is a node built in stuff
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

export const getRecieverSocketId =(recieverId)=>{
    return userSocketMap[recieverId]
}

const userSocketMap = {} //{userId:socketId}
io.on('connection', (socket) => {
    console.log('a user is connected', socket.id)

    //the below is comming the context, where i am passing the user into the query inside the useeffect
    const userId = socket?.handshake?.query?.userId

    if (userId != "undefined") userSocketMap[userId] = socket.id

    // io.emit() is used to send events to all connected clients
    //getOnlineusers can be any name
    io.emit('getOnlineusers', Object.keys(userSocketMap))




    //socket.on() is used to listen for event,can be used both on client and server side
    socket.on('disconnect', () => {
        console.log('a user disconnected', socket.id)

        //when a client disconnect, we delete the id from the userSocketMap and send event to all clients
        delete userSocketMap[userId]
        io.emit('getOnlineusers', Object.keys(userSocketMap))

    })
})



export { app, server, io }
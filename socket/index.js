const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');

const app = express();
const io = new Server({ cors:"http://localhost:3000" })

let onlineUsers = []

io.on("connection", (socket) => {
    console.log("new connection", socket.id);

    //Listen to a connection of a user of chat KGV
    socket.on("addNewUser", (userId) => {
        !onlineUsers.some((user) => user.userId === userId) && 
        onlineUsers.push({
            userId,
            socketId: socket.id
        });

        console.log("onlineUsers", onlineUsers);
        io.emit("getOnlineUsers", onlineUsers);
    });

    socket.on("sendMessage", (message) => {
        const user = onlineUsers.find(user => user.userId === message.recipientID);
        
        if(user){
            io.to(user.socketId).emit("getMessage", message);
        }
    })
    socket.on("disconnect", ()=>{
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
        console.log("onlineUsers", onlineUsers);
        io.emit("getOnlineUsers", onlineUsers);
    })
})

io.listen(3500)
// app.get('/', (req, res) => {
//   res.send('<h1>Hello world</h1>');
// });

// server.listen(3000, () => {
//   console.log('server running at http://localhost:3000');
// });
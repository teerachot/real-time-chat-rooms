import express from "express";
import ConnectDB from "./config/db";
import user from "./routes/api/user";
import auth from "./routes/api/auth";
import {saveMessage, getMessage} from "./service/message"


import http from "http";
import { Server } from "socket.io";

ConnectDB();

const app = express();

const server = http.createServer(app);

// create is server

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const leaveRoom = (userID, chatRoomUsers) =>{
    return chatRoomUsers.filter((user) => user.id != userID);
}

const CHAT_BOT = 'ChatBot';

let chatRoom = ''; // E.g. javascript, node,... fetch data from database
let allUsers = []; // All users in current chat room


io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  // Add a user to a room
  socket.on("join_room",async (data) => {
    const { username, room } = data; // Data sent from client when join_room event emitted
    socket.join(room); // Join the user to a socket room

    let createdTime = Date.now();
    socket.to(room).emit("receive_message", {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      createdTime: createdTime,
    });

    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      createdTime: createdTime,
    });

    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    let chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit('chatroom_users', chatRoomUsers);
    socket.emit('chatroom_users', chatRoomUsers);

    let allMessages = await getMessage(room)
    socket.emit('all_messages', allMessages);

  });

  socket.on('send_message', (data) => {
    const { message, username, room, createdTime } = data;
    console.log(message, username, room, createdTime )
    io.in(room).emit('receive_message', data); // Send to all users in room, including sender
    saveMessage({message,username,room, createdTime})
    
  });

  socket.on('leave_room', (data) => {
    const { username, room } = data;
    socket.leave(room);
    const createdTime = Date.now();
    // Remove user from memory
    allUsers = leaveRoom(socket.id, allUsers);
    socket.to(room).emit('chatroom_users', allUsers);
    socket.to(room).emit('receive_message', {
      username: CHAT_BOT,
      message: `${username} has left the chat`,
      createdTime,
    });
    console.log(`${username} has left the chat`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected from the chat');
    const user = allUsers.find((user) => user.id == socket.id);
    if (user?.username) {
      allUsers = leaveRoom(socket.id, allUsers);
      socket.to(chatRoom).emit('chatroom_users', allUsers);
      socket.to(chatRoom).emit('receive_message', {
        message: `${user.username} has disconnected from the chat.`,
      });
    }
  });

});

app.use(express.json({ extended: false }));

app.use("/api/user", user);


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`server start on port ${PORT}`));

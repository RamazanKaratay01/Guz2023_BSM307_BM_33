const express = require('express');
const app = express();
http = require('http');
const cors = require('cors');
require('dotenv').config();
const { Server } = require('socket.io');
const harperSaveMessage = require('./services/save-message'); 
const harperGetMessages = require('./services/get-messages');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const CHAT_BOT = 'ChatBot';
let chatRoom = '';
let allUsers = [];





io.on('connection', (socket) => {

  socket.on('send_message', (data) => {
    const { message, username, room, __createdtime__ } = data;
    io.in(room).emit('receive_message', data);
    harperSaveMessage(message, username, room, __createdtime__)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  });

  console.log(`User connected ${socket.id}`);

  socket.on('join_room', (data) => {
    const { username, room } = data;
    socket.join(room);

    let __createdtime__ = Date.now();

    socket.to(room).emit('receive_message', {
      message: `${username} odaya katildi`,
      username: CHAT_BOT,
      __createdtime__,
    });

    socket.emit('receive_message', {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__,
    });

    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    chatRoomUsers = allUsers.filter((user) => user.room === room);
    socket.to(room).emit('chatroom_users', chatRoomUsers);
    socket.emit('chatroom_users', chatRoomUsers);
  });

  getMessages(room)
      .then((last100Messages) => {
        socket.emit('last_100_messages', last100Messages);
      })
      .catch((err) => console.log(err));
});

server.listen(4000, () => '4000 portunda dinleme yapılıyor..');
'use strict';

const socketio = require('socket.io');

const PORT = 3000;

const server = socketio(PORT);

const messages = server.of('/messages');

messages.on('connection', (socket) => {
  console.log('Socket is connected', socket.id);

  socket.on('message', (payload) => {
    console.log(payload);

    messages.emit('received', {
      id: socket.id,
      payload
    })
  })
})

// messages.on('connection', (socket) => {
//   console.log(`${socket.id} connected to message server`);

//   socket.on('join', (payload) => {
//     socket.join(payload.roomname);
//   });

//   socket.on('message', (payload) => {
//     messages.emit(payload.message);
//   })
// })
'use strict';

const socketio = require('socket.io');
const PORT = 3000;
const server = socketio(PORT);
const messages = server.of('/messages');

messages.on('connection', (socket) => {
  console.log('Socket is connected', socket.id);

  socket.on('pickup', logEvent('pickup'), (payload) => {
    console.log(payload);

    messages.emit('received', {
      id: socket.id,
      payload
    })
  })
})

const logEvent = require('./log-event.js');

require('../Driver/driver.js');
require('../Vendor/vendor.js');

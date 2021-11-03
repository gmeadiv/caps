'use strict';

const socketio = require('socket.io');
const PORT = 3000;
const server = socketio(PORT);
const vendor = server.of('/vendor');
const driver = server.of('/driver');

let order;

vendor.on('connection', (socket) => {
  console.log(`${socket.id} connected to vendor server`);

  socket.on('pickup', (payload) => {order = payload;})

});

driver.on('connection', (socket) => {
  console.log(`${socket.id} connected to driver server`);

  server.emit('pickup', order)
});

const logEvent = require('./log-event.js');

require('../Driver/driver.js');
require('../Vendor/vendor.js');

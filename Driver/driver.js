'use strict';

const client = require('socket.io-client');

const messageClient = client.connect('http://localhost:3000/driver');

function handlePickup(payload) {
  console.log(`DRIVER: picked up ${payload.orderId}`);
  messageClient.emit('in-transit', payload);

  console.log(`DRIVER: delivered ${payload.orderId}`);
  messageClient.emit('delivered', payload);
}

messageClient.on('pickup', handlePickup);

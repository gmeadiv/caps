'use strict';

const messenger = require('../messenger.js');

const input = process.argv[2];

const messageId = Math.floor(Math.random() * 1000000);

messenger.on('recieved', (payload) => {
  console.log('Message received by:', payload)
});

// RECEVER'S JOB
messenger.on('message', (payload) => {
  let clientId = Math.floor(Math.random * 100000)
  console.log('message received', payload);

  messenger.emit('received', {clientId});
});

messenger.emit('message', {
  id: messageId,
  test: input
});

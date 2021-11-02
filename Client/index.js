'use strict';

const client = require('socket.io-client');

function connect(namespace) {
  return client(`http://localhost:3000/${namespace}`)
}

const messageClient = client('http:/localhost:3000/messages');

messageClient.emit('message', 'hellop world');
messageClient.on('received', console.log);

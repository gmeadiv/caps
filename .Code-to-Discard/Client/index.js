'use strict';

const client = require('socket.io-client');

const messageClient = client.connect('http://localhost:3000/messages');

messageClient.emit('message', 'hello world');
messageClient.on('received', console.log);

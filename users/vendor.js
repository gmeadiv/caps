'use strict';

const messenger = require('./messenger.js');

messenger.on('message', (payload) => {
  console.log('message received', payload);

  messenger.emit('received', payload);
});
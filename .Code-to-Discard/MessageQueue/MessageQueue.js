'use strict';

class MessageQueue {
  constructor() {
    this.messages = {};
  }

  add(clientId, message) {

    if (!this.messages[clientId]) {

      this.messages[clientId] = [message];

    } else {

      // this.messages[clientId].push([message]);
      this.messages[clientId].unshift(message);

    }
  }

  received(clientId, message) {

    if (this.messages[clientId]) {

      let queue = this.messages[clientId];

      let front = queue[queue.length - 1];

      if (front === message) {

       queue.pop();

       return;

      } else {

        throw new Error ('Invalid Message Receipt 2');
  
      }

    } else {

      throw new Error ('Invalid Message Receipt 1');

    }

  }
}

module.exports = MessageQueue;
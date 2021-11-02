'use strict';

class MessageQueue {
  constructor() {
    this.messages = {};
  }

  add(clientId, message) {

    if (!this.messages[clientId]) {

      this.messages[clientId] = [message];

    } else {

      this.messages[clientId].push([message]);

    }
  }

  received(clientId, message) {

    if (this.messages[clientId]) {

      let queue = this.messages[clientId];

      let front = queue.peek();

      if (front === message) {

       queue.dequeue();
       return;

      } else {

        throw new Error ('Invalid Message Receipt');
  
      }

    } else {

      throw new Error ('Invalid Message Receipt');

    }

  }
}
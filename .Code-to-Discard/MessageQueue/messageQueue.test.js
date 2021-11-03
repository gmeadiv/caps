'use strict';

const MessageQueue = require('./MessageQueue.js');

describe('Testing the message queue constructor', () => {
  let test = new MessageQueue();
  let client1 = 'client 1';
  let client2 = 'client2';

  it('should be able to send messages to different clients', () => {
    test.add(client1, 'test message 1 for client 1');
    test.add(client1, 'test message 2 for client 1');
    test.add(client1, 'test message 3 for client 1');

    test.add(client2, 'test message 1 for client 2');
    test.add(client2, 'test message 2 for client 2');


    expect(test.messages[client1][0]).toBe('test message 1 for client 1')
    expect(test.messages[client1][1]).toBe('test message 2 for client 1')
    expect(test.messages[client1][2]).toBe('test message 3 for client 1')
    expect(test.messages[client1].length).toBe(3)

    expect(test.messages[client2][0]).toBe('test message 1 for client 2')
    expect(test.messages[client2][1]).toBe('test message 2 for client 2')
    expect(test.messages[client2].length).toBe(2)

  }) 

  it('should confirm receipt of the first message', () => {

    try {
      test.received(client1, 'test message 1 for client 1');
      expect(queue[queue.length - 1]).toBe('test message 2 for client 1');
      expect(queue.length).toBe(1)
    } catch (error) {
      expect(error).toBeFalsy()
    }

  }) 

  it('should throw an error when confirming message out of order', () => {

    try {
      test.received(client1, 'test message 3 for client 1');
    } catch (error) {
      expect(error.message).toBe('Invalid Message Receipt 1')
    }
  })

})
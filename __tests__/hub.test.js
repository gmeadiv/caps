'use strict';

const logEvent = require('../Hub/log-event.js');

describe('testing hub server handler', () => {

  console.log = jest.fn();

  it('should log a mock event and payload', () => {

    let eventHandler = logEvent('test');

    let payload = {

      store: 'test store',
      orderId: '123test_id456',
      customer: 'test customer',
      address: '123 test address'

    }

    eventHandler(payload);
    expect(console.log).toHaveBeenCalled();
  })
})
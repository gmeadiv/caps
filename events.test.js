'use strict';

const ee = require('./EventEmitter.js');

console.log = jest.fn();

ee.on('delivered', (event) => {

  console.log('VENDOR: thank you for delivering', event.payload.orderId);
  console.log('EVENT', event);

});
ee.on('delivered', delivered);

ee.on('in-transit', (event) => {

  console.log('EVENT', event);

  const deliveryDetails = event.payload;

  console.log('DRIVER: delivered order', deliveryDetails.orderId);

  ee.emit('delivered', {
    event: 'delivered',
    time: randomTime,
    payload: deliveryDetails
  });

});
ee.on('in-transit', inTransit);

ee.on('pickup', (event) => {
  
  console.log('EVENT', event);

  const deliveryDetails = event.payload;

  console.log('DRIVER: picked up order:', deliveryDetails.orderId)

  ee.emit('in-transit', {
    event: 'in-transit',
    time: randomTime,
    payload: deliveryDetails
  });
});
ee.on('pickup', pickup);

ee.on('order', (event) => {

  const order = event;

  ee.emit('pickup', {
    event: 'pickup',
    time: randomTime,
    payload: {
      store: order.store,
      orderId: order.orderId,
      customer: order.customer,
      address: order.address
    }
  });
});
ee.on('order', order);

// TEST FUNCTIONS
function order( payload ) {
  console.log(JSON.stringify(payload), '<-- ORDER TEST PASSED')

  return JSON.stringify(payload);
}

function pickup( payload ) {
  console.log(payload, '<-- PICKUP TEST PASSED')

  return payload;
}

function inTransit( payload ) {
  console.log(payload, '<-- IN TRANSIT TEST PASSED')

  return payload;
}

function delivered( payload ) {
  console.log(payload, '<-- DELIVERED TEST PASSED')

  return payload;
}

// TESTS
describe('Testing event listeners', () => {

  let orderDetails;

  ee.emit('order', orderDetails = {
    store: 'Test Store',
    orderId: '123TESTid123',
    customer: 'Test Customer',
    address: 'Test Address'
  });

    test('It should listen for events and return order details', () => {
  
      expect(console.log).toHaveBeenCalled();
      expect(JSON.stringify(orderDetails)).toStrictEqual('{\"store\":\"Test Store\",\"orderId\":\"123TESTid123\",\"customer\":\"Test Customer\",\"address\":\"Test Address\"}');
    });

});
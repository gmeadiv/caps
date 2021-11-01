'use strict';

const ee = require('./EventEmitter.js');
const faker = require('faker');

const randomTime = faker.date.soon();
const randomStore = faker.company.companyName();
const randomId = faker.random.alphaNumeric(15);
const randomCustomer = faker.name.findName();
const randomAddress = faker.address.streetAddress();

// VENDOR THANKS DRIVER
ee.on('delivered', (event) => {

  console.log('VENDOR: thank you for delivering', event.payload.orderId);
  console.log('EVENT', event);

});
ee.on('delivered', delivered);

// DRIVER DELIVERS ORDER
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

//DRIVER PICKS ORDER UP
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

// VENDOR CREATES A PICKUP ORDER
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


// CUSTOMER CREATES ORDER
ee.emit('order', {
  store: randomStore,
  orderId: randomId,
  customer: randomCustomer,
  address: randomAddress
});

// TEST FUNCTIONS
function order( payload ) {
  console.log(payload, '<-- ORDER TEST PASSED')

  return payload;
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

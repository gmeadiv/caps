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

// CUSTOMER CREATES ORDER
ee.emit('order', {
  store: randomStore,
  orderId: randomId,
  customer: randomCustomer,
  address: randomAddress
});

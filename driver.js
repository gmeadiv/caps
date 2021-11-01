'use strict';

const ee = require('./EventEmitter.js');
const faker = require('faker');

const randomTime = faker.date.future();
const randomStore = faker.company.companyName();
const randomId = Math.floor(Math.random() * 1000000);
const randomCustomer = faker.name.findName();
const randomAddress = faker.address.streetAddress();

ee.on('pickup', (payload) => {
  console.log('message received', payload);
});

ee.emit('pickup', {
  event: 'pickup',
  time: randomTime,
  payload: {
    store: randomStore,
    orderId: randomId,
    customer: randomCustomer,
    address: randomAddress
  }
});

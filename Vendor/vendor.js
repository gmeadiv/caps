'use strict';

const faker = require('faker');
const randomStore = faker.company.companyName();
const randomId = faker.datatype.uuid();
const randomCustomer = faker.name.findName();
const randomAddress = `${faker.address.streetAddress()} ${faker.address.city()}, ${faker.address.stateAbbr()} ${faker.address.zipCode()}`;

const client = require('socket.io-client');

const messageClient = client.connect('http://localhost:3000/messages');

messageClient.emit('pickup', {
  store: randomStore,
  orderId: randomId,
  customer: randomCustomer,
  address: randomAddress
});
messageClient.on('received', console.log);
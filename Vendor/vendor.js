'use strict';

const caps = require('../Hub/events.js');

const faker = require('faker');
const logDelivery = require('./log-delivery.js');

const randomStore = faker.company.companyName();
const randomId = faker.random.alphaNumeric(15);
const randomCustomer = faker.name.findName();
const randomAddress = faker.address.streetAddress();

caps.on('delivered', logDelivery);

function pickup(storeName) {
  let payload = {
    store: storeName,
    orderId: randomId,
    customer: randomCustomer,
    address: randomAddress
  }

  caps.emit('pickup', payload)
}

pickup(`${randomStore}`);
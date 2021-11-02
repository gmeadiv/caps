'use strict';

const caps = require('../Hub/events.js');

const faker = require('faker');

const randomTime = faker.date.soon();
const randomStore = faker.company.companyName();
const randomId = faker.random.alphaNumeric(15);
const randomCustomer = faker.name.findName();
const randomAddress = faker.address.streetAddress();

// caps.on('delivered');

function pickup(storeName) {
  let payload = {
    store: storeName,
    orderId: randomId,
    customer: randomCustomer,
    address: randomAddress
  }

  console.log(payload)
}

pickup(randomStore);
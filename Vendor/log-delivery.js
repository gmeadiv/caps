'use strict';

function logDelivery(payload) {

  console.log(`Thank you, ${payload.customer}`);

}

module.exports = logDelivery;
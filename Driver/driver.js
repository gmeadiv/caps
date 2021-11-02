'use strict';

const caps = require('../Hub/events.js');
const handlerPickup = require('./handle-pickup.js');

caps.on('pickup', handlerPickup);
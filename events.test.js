'use strict';

const supertest = require('supertest');
const server = require('./events.js')

const mockRequest = supertest(server);
// Abstraction layer to handle knex configuration per enviornment.
const environment = process.env.NODE_ENV || 'development';
const config = require('../knexfile.js')[environment];

module.exports = require('knex')(config);

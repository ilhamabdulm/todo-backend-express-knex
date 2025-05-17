const knex = require('../config/db.config');

async function get(id) {
  const results = await knex('users').where({ id });
  return results[0];
}

async function getByEmail(email) {
  const results = await knex('users').where({ email });
  return results[0];
}

async function create(body) {
  const results = await knex('users').insert(body).returning('*');
  return results[0];
}

async function update(id, properties) {
  const results = await knex('users')
    .where({ id })
    .update({ ...properties })
    .returning('*');
  return results[0];
}

module.exports = {
  get,
  create,
  update,
  getByEmail,
};

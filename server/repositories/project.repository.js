const knex = require('../config/db.config');

async function all() {
  return knex('projects');
}

async function allByUser(user_id) {
  return knex('projects').where({ user_id });
}

async function getById(id) {
  const results = await knex('projects').where({ id });
  return results[0];
}

async function create(title, user_id) {
  const results = await knex('projects')
    .insert({ title, user_id })
    .returning('*');
  return results[0];
}

async function update(id, properties) {
  const results = await knex('projects')
    .where({ id })
    .update({ ...properties })
    .returning('*');
  return results[0];
}

// delete is a reserved keyword
async function del(id) {
  const results = await knex('projects').where({ id }).del().returning('*');
  return results[0];
}

module.exports = {
  all,
  getById,
  create,
  update,
  delete: del,
  allByUser,
};

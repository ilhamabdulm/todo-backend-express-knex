const knex = require('../config/db.config');

async function all() {
  return knex('todos');
}

async function allByProject(project_id) {
  return knex('todos')
    .select(
      'todos.*',
      'users.id as user_id',
      'users.name as user_name',
      'users.email as user_email',
      'projects.id as project_id',
      'projects.name as project_name'
    )
    .leftJoin('users', 'todos.user_id', '=', 'users.id')
    .leftJoin('projects', 'todos.project_id', '=', 'projects.id')
    .where('todos.project_id', project_id);
}

async function get(id) {
  const results = await knex('todos').where({ id });
  return results[0];
}

async function create(title, order, project_id, user_id) {
  const results = await knex('todos')
    .insert({ title, order, project_id, user_id })
    .returning('*');
  return results[0];
}

async function update(id, properties) {
  const results = await knex('todos')
    .where({ id })
    .update({ ...properties })
    .returning('*');
  return results[0];
}

// delete is a reserved keyword
async function del(id) {
  const results = await knex('todos').where({ id }).del().returning('*');
  return results[0];
}

async function clear() {
  return knex('todos').del().returning('*');
}

module.exports = {
  all,
  get,
  create,
  update,
  delete: del,
  clear,
  allByProject,
};

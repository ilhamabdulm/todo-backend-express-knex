const knex = require('../config/db.config');

async function all() {
  return knex('projects');
}

async function allByUser(user_id) {
  return knex('projects_users')
    .select('projects.*', 'projects_users.user_id', 'projects_users.project_id')
    .join('projects', 'projects_users.project_id', '=', 'projects.id')
    .where('projects_users.user_id', user_id);
}

async function getById(id) {
  const results = await knex('projects').where({ id });
  return results[0];
}

async function create(name, user_id) {
  const results = await knex('projects')
    .insert({ name, user_id })
    .returning('*');
  const project = results[0];
  await knex('projects_users').insert({ project_id: project.id, user_id });
  return project;
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

async function assignProjectUser(project_id, user_id) {
  const project = await knex('projects_users')
    .insert({ project_id, user_id })
    .returning('*');
  return project[0];
}

module.exports = {
  all,
  getById,
  create,
  update,
  delete: del,
  allByUser,
  assignProjectUser,
};

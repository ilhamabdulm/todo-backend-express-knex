const knex = require('../config/db.config');

async function all() {
  return knex('organization');
}

async function allByUser(user_id) {
  return knex('organization_users')
    .select(
      'organization.*',
      'organization_users.user_id',
      'organization_users.organization_id'
    )
    .join(
      'organization',
      'organization_users.organization_id',
      '=',
      'organization.id'
    )
    .where('organization_users.user_id', user_id);
}

async function getById(id) {
  const results = await knex('organization').where({ id });
  return results[0];
}

async function create(name, user_id) {
  const results = await knex('organization')
    .insert({ name, user_id })
    .returning('*');
  const org = results[0];
  await knex('organization_users').insert({
    organization_id: org.id,
    user_id,
    read: true,
    update: true,
    write: true,
    delete: true,
  });
  return org;
}

async function update(id, properties) {
  const results = await knex('organization')
    .where({ id })
    .update({ ...properties })
    .returning('*');
  return results[0];
}

// delete is a reserved keyword
async function del(id) {
  const results = await knex('organization').where({ id }).del().returning('*');
  return results[0];
}

async function assignOrganizationUser(organization_id, user_id) {
  const project = await knex('organization_users')
    .insert({ organization_id, user_id })
    .returning('*');
  return project[0];
}

async function getByUserIdAndOrganizationId(user_id, organization_id) {
  const results = await knex('organization_users').where({
    user_id,
    organization_id,
  });
  return results[0];
}

module.exports = {
  all,
  getById,
  create,
  update,
  delete: del,
  allByUser,
  assignOrganizationUser,
  getByUserIdAndOrganizationId,
};

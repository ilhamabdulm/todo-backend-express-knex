const _ = require('lodash');

const users = require('../repositories/user.repository');

const organizations = require('../repositories/organization.repository');
const { addErrorReporting } = require('../utils/helper');

async function getAllOrg(req, res) {
  const user = req.user;
  const allEntries = await organizations.allByUser(user.decoded.id);
  return res.status(200).json({ message: 'success', data: allEntries });
}

async function getOrgById(req, res) {
  const project = await organizations.getById(req.params.id);
  return res.status(200).json({ message: 'success', data: project });
}

async function postOrg(req, res) {
  const user = req.user;
  let body = req.body;
  const created = await organizations.create(body.name, user.decoded.id);
  return res.status(200).json({ message: 'success', data: created });
}

async function patchOrg(req, res) {
  const patched = await organizations.update(req.params.id, req.body);
  return res.status(200).json({ message: 'success', data: patched });
}

async function deleteOrg(req, res) {
  const deleted = await organizations.delete(req.params.id);
  return res.status(200).json({ message: 'success', data: deleted });
}

async function postOrgInviteUser(req, res) {
  let body = req.body;

  const userExist = await users.getByEmail(body.email);

  if (!userExist) {
    return res.status(400).json({ message: 'User doesnt exists' });
  }

  const orgExist = await organizations.getById(body.organization_id);

  if (!orgExist) {
    return res.status(400).json({ message: 'Organization doesnt exists' });
  }

  const created = await organizations.assignOrganizationUser(
    orgExist.id,
    userExist.id
  );

  return res.status(200).json({ message: 'success', data: created });
}

module.exports = {
  getAllOrg: addErrorReporting(getAllOrg, 'Failed to fetch all organization'),
  deleteOrg: addErrorReporting(deleteOrg, 'Failed to delete organization'),
  getOrgById: addErrorReporting(getOrgById, 'Failed to fetch organization'),
  postOrg: addErrorReporting(postOrg, 'Failed to create organization'),
  patchOrg: addErrorReporting(patchOrg, 'Failed to update organization'),
  postOrgInviteUser: addErrorReporting(
    postOrgInviteUser,
    'Failed invite to organization'
  ),
};

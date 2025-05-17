const _ = require('lodash');

const projects = require('../repositories/project.repository');
const users = require('../repositories/user.repository');
const { addErrorReporting } = require('../utils/helper');

async function getAllProject(req, res) {
  const user = req.user;
  const allEntries = await projects.allByUser(user.decoded.id);
  return res.status(200).json({ message: 'success', data: allEntries });
}

async function getProjectByid(req, res) {
  const project = await projects.getById(req.params.id);
  return res.status(200).json({ message: 'success', data: project });
}

async function postProject(req, res) {
  const user = req.user;
  let body = req.body;
  const created = await projects.create(body.name, user.decoded.id);
  return res.status(200).json({ message: 'success', data: created });
}

async function patchProject(req, res) {
  const patched = await projects.update(req.params.id, req.body);
  return res.status(200).json({ message: 'success', data: patched });
}

async function deleteProject(req, res) {
  const deleted = await projects.delete(req.params.id);
  return res.status(200).json({ message: 'success', data: deleted });
}

async function postProjectInviteUser(req, res) {
  let body = req.body;

  const userExist = await users.getByEmail(body.email);

  if (!userExist) {
    return res.status(400).json({ message: 'User doesnt exists' });
  }

  const projectExist = await projects.getById(body.project_id);

  if (!projectExist) {
    return res.status(400).json({ message: 'Project doesnt exists' });
  }

  const created = await projects.assignProjectUser(
    projectExist.id,
    userExist.id
  );

  return res.status(200).json({ message: 'success', data: created });
}

module.exports = {
  getAllProject: addErrorReporting(
    getAllProject,
    'Failed to fetch all projects'
  ),
  deleteProject: addErrorReporting(deleteProject, 'Failed to delete projects'),
  getProjectByid: addErrorReporting(getProjectByid, 'Failed to fetch projects'),
  postProject: addErrorReporting(postProject, 'Failed to create projects'),
  patchProject: addErrorReporting(patchProject, 'Failed to update projects'),
  postProjectInviteUser: addErrorReporting(
    postProjectInviteUser,
    'Failed invite to projects'
  ),
};

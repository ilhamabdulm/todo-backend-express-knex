const _ = require('lodash');

const projects = require('../repositories/project.repository');
const { addErrorReporting } = require('../utils/helper');

async function getAllProject(req, res) {
  const user = req.user;
  const allEntries = await projects.allByUser(user.id);
  return res.status(200).json(allEntries);
}

async function getProjectByid(req, res) {
  const todo = await projects.getById(req.params.id);
  return res.status(200).json(todo);
}

async function postTodo(req, res) {
  const created = await todos.create(
    req.body.title,
    req.body.order,
    req.body.project_id,
    null
  );
  return res.status(200).json(createToDo(req, created));
}

async function patchTodo(req, res) {
  const patched = await todos.update(req.params.id, req.body);
  return res.status(200).json(createToDo(req, patched));
}

async function deleteProject(req, res) {
  const deleted = await projects.delete(req.params.id);
  return res.status(200).json(createToDo(req, deleted));
}

module.exports = {
  getAllProject: addErrorReporting(
    getAllProject,
    'Failed to fetch all projects'
  ),
  deleteProject: addErrorReporting(deleteProject, 'Failed to delete projects'),
  getProjectByid: addErrorReporting(
    getProjectByid,
    'Failed to fetch projects'
  ),
};

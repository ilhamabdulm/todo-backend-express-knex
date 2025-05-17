const _ = require('lodash');

const todos = require('../repositories/todo.repository');
const projects = require('../repositories/project.repository');
const users = require('../repositories/user.repository');
const { addErrorReporting, createToDo } = require('../utils/helper');

async function getAllTodos(req, res) {
  const query = req.query;
  const allEntries = await todos.allByProject(query.project_id);
  return res.status(200).json({
    message: 'success',
    data: allEntries,
  });
}

async function getTodo(req, res) {
  const todo = await todos.get(req.params.id);
  return res.status(200).json({ message: 'success', data: todo });
}

async function postTodo(req, res) {
  const projectExist = await projects.getById(req.body.project_id);

  if (!projectExist) {
    return res.status(400).json({ message: 'Project doesnt exists' });
  }

  const created = await todos.create(
    req.body.title,
    req.body.order,
    req.body.project_id,
    null
  );
  return res
    .status(200)
    .json({ message: 'success', data: createToDo(req, created) });
}

async function patchTodo(req, res) {
  const patched = await todos.update(req.params.id, req.body);
  return res
    .status(200)
    .json({ message: 'success', data: createToDo(req, patched) });
}

async function deleteAllTodos(req, res) {
  const deletedEntries = await todos.clear();
  return res.status(200).json({
    message: 'success',
    data: deletedEntries.map(_.curry(createToDo)(req)),
  });
}

async function deleteTodo(req, res) {
  const deleted = await todos.delete(req.params.id);
  return res
    .status(200)
    .json({ message: 'success', data: createToDo(req, deleted) });
}

async function patchAssignUser(req, res) {
  const body = req.body;
  const userExist = await users.get(body.user_id);

  if (!userExist) {
    return res.status(400).json({ message: 'User doesnt exists' });
  }

  const patched = await todos.update(req.params.id, req.body);
  return res
    .status(200)
    .json({ message: 'success', data: createToDo(req, patched) });
}

module.exports = {
  getAllTodos: addErrorReporting(getAllTodos, 'Failed to fetch all todos'),
  getTodo: addErrorReporting(getTodo, 'Failed to fetch todos'),
  postTodo: addErrorReporting(postTodo, 'Failed to create todos'),
  patchTodo: addErrorReporting(patchTodo, 'Failed to update todos'),
  deleteAllTodos: addErrorReporting(
    deleteAllTodos,
    'Failed to delete all todos'
  ),
  deleteTodo: addErrorReporting(deleteTodo, 'Failed to delete todos'),
  patchAssignUser: addErrorReporting(
    patchAssignUser,
    'Failed to assign user to todos'
  ),
};

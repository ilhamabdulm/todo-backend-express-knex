const _ = require('lodash');

const todos = require('../repositories/todo.repository');
const { addErrorReporting, createToDo } = require('../utils/helper');

async function getAllTodos(req, res) {
  const allEntries = await todos.all();
  return res.status(200).json(allEntries.map(_.curry(createToDo)(req)));
}

async function getTodo(req, res) {
  const todo = await todos.get(req.params.id);
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

async function deleteAllTodos(req, res) {
  const deletedEntries = await todos.clear();
  return res.status(200).json(deletedEntries.map(_.curry(createToDo)(req)));
}

async function deleteTodo(req, res) {
  const deleted = await todos.delete(req.params.id);
  return res.status(200).json(createToDo(req, deleted));
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
};

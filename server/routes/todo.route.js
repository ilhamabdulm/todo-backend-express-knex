const ctrl = require('../controllers/todo.controller');
const { authorization } = require('../middlewares/authorization');
const express = require('express');

module.exports = () => {
  return new express.Router()
    .use(authorization)
    .get('/', ctrl.getAllTodos)
    .get('/:id', ctrl.getTodo)

    .post('/', ctrl.postTodo)
    .patch('/:id', ctrl.patchTodo)

    .delete('/', ctrl.deleteAllTodos)
    .delete('/:id', ctrl.deleteTodo);
};

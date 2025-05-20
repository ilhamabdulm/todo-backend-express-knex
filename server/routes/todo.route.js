const ctrl = require('../controllers/todo.controller');
const { authorization } = require('../middlewares/authorization');
const express = require('express');
const validate = require('../middlewares/schema-validator');
const { todoSchema, todoAssignUserSchema } = require('../schemas/todo.schema');

module.exports = () => {
  return new express.Router()
    .use(authorization)
    .patch(
      '/:id/assign-user',
      validate(todoAssignUserSchema),
      ctrl.patchAssignUser
    )
    .get('/', ctrl.getAllTodos)
    .get('/:id', ctrl.getTodo)

    .post('/', validate(todoSchema), ctrl.postTodo)
    .patch('/:id', ctrl.patchTodo)

    .delete('/', ctrl.deleteAllTodos)
    .delete('/:id', ctrl.deleteTodo);
};

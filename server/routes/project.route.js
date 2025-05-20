const ctrl = require('../controllers/project.controller');
const { authorization } = require('../middlewares/authorization');
const express = require('express');
const validate = require('../middlewares/schema-validator');
const {
  projectInviteUser,
  projectSchema,
} = require('../schemas/project.schema');

module.exports = () => {
  return new express.Router()
    .use(authorization)
    .post(
      '/invite-user',
      validate(projectInviteUser),
      ctrl.postProjectInviteUser
    )

    .get('/', ctrl.getAllProject)
    .get('/:id', ctrl.getProjectByid)

    .post('/', validate(projectSchema), ctrl.postProject)
    .patch('/:id', ctrl.patchProject)

    .delete('/:id', ctrl.deleteProject);
};

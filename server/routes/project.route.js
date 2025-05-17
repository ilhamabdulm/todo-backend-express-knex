const ctrl = require('../controllers/project.controller');
const { authorization } = require('../middlewares/authorization');
const express = require('express');

module.exports = () => {
  return new express.Router()
    .use(authorization)
    .post('/invite-user', ctrl.postProjectInviteUser)

    .get('/', ctrl.getAllProject)
    .get('/:id', ctrl.getProjectByid)

    .post('/', ctrl.postProject)
    .patch('/:id', ctrl.patchProject)

    .delete('/:id', ctrl.deleteProject);
};

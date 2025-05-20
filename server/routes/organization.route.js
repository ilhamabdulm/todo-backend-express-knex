const ctrl = require('../controllers/organization.controller');
const { authorization } = require('../middlewares/authorization');
const express = require('express');
const validate = require('../middlewares/schema-validator');
const {
  organizationSchema,
  organizationInviteUser,
} = require('../schemas/organization.schema');
const {
  validateOrganizationAccess,
} = require('../middlewares/check-access-organization');

module.exports = () => {
  return new express.Router()
    .use(authorization)
    .post(
      '/invite-user',
      validate(organizationInviteUser),
      ctrl.postOrgInviteUser
    )

    .get('/', ctrl.getAllOrg)
    .get('/:id', ctrl.getOrgById)

    .post('/', validate(organizationSchema), ctrl.postOrg)
    .patch('/:id', validateOrganizationAccess, ctrl.patchOrg)
    .delete('/:id', validateOrganizationAccess, ctrl.deleteOrg);
};

const ctrl = require('../controllers/user.controller');
const validate = require('../middlewares/schema-validator');
const { userSchema, userSchemaRegister } = require('../schemas/user.schema');

module.exports = (router) => {
  return router
    .post('/login', validate(userSchema), ctrl.postLoginUser)
    .post('/register', validate(userSchemaRegister), ctrl.postRegisterUser);
};

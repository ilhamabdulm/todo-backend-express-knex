const ctrl = require('../controllers/user.controller');

module.exports = (router) => {
  return router
    .post('/login', ctrl.postLoginUser)
    .post('/register', ctrl.postRegisterUser);
};

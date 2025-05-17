module.exports = (express, app) => {
  const router = new express.Router();

  const todoRoutes = require('./todo.route')(router);
  const userRoutes = require('./user.route')(router);

  router.use('/user', userRoutes);
  router.use('/todo', todoRoutes);

  app.use(router);
};

module.exports = (express, app) => {
  const router = new express.Router();

  const todoRoutes = require('./todo.route')(router);
  const userRoutes = require('./user.route')(router);
  const projectRoutes = require('./project.route')(router);

  router.use('/user', userRoutes);
  router.use('/todo', todoRoutes);
  router.use('/project', projectRoutes);

  app.use(router);
};

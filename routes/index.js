module.exports = (app) => {
  const usersController = require('../controllers/users');
  app.use('/users', usersController);
  const authController = require('../controllers/auth.js');
  app.use('/auth', authController);
  const profileController = require('../controllers/profile.js');
  app.use('/profile', profileController);
  const postsController = require('../controllers/posts.js');
  app.use('/posts', postsController);
};

const express = require('express');

const routes = express.Router();

const userController = require('./controllers/UserController');
const authController = require('./controllers/AuthController');

routes.route('/token')
  .post(authController.getToken);

routes.route('/users')
  .get(userController.getUserByToken)
  .post(userController.create)
  .put(userController.update);

module.exports = routes;

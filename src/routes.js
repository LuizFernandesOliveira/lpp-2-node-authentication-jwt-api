const express = require('express');

const routes = express.Router();

const userController = require('./controllers/UserController');
const authController = require('./controllers/AuthController');

routes.route('/token')
  .post(authController.getToken);

routes.route('/users')
  .post(userController.create);

module.exports = routes;

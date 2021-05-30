const express = require('express');

const routes = express.Router();

const userController = require('./controllers/UserController');

routes.route('/users')
  .post(userController.create);

module.exports = routes;

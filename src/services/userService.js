const { userCreateValidate } = require('../validations/userValidation');

const { User } = require('../models');
class UserService {
  async create(user) {
    const { email, password } = user;
    userCreateValidate(email, password);

  }
}

module.exports = new UserService();

const { userCreateValidate } = require('../validations/userValidation');

class UserService {
  async create(user) {
    const { email } = user;
    userCreateValidate(email);
  }
}

module.exports = new UserService();

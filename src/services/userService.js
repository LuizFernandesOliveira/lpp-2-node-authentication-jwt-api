const httpStatus = require('../helpers/httpStatus');
const UserException = require('../exceptions/userException');
const authService = require('./authService');

const { User } = require('../models');

module.exports = {
  async create(user) {
    try {
      const userCreated = await User.create(user);
      return userCreated;
    } catch (error) {
      const { message } = error.errors[0];
      throw new UserException(message, httpStatus.BAD_REQUEST);
    }
  },

  async getUserByToken(token) {
    const user = await authService.getUserByToken(token);

    return user;
  },

  async update({ name }, token) {
    const user = await this.getUserByToken(token);

    await User.update({ name }, { where: { email: user.email }});
    user.name = name;

    return user;
  }
};

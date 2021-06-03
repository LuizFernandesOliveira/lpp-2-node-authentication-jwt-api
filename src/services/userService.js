const httpStatus = require('../helpers/httpStatus');
const UserException = require('../exceptions/userException');

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
};

const httpStatus = require('../helpers/httpStatus');
const message = require('../helpers/message');
const userService = require('../services/userService');

class UserController {
  async create(request, response) {
    try {
      const user = await userService.create(request.body);
      return response.status(httpStatus.CREATED).json(user);
    } catch (e)  {
      return response.status(e.httpStatus).json({ message: e.message });
    }
  }

  async getUserByToken(request, response) {
    try {
      const user = await userService.getUserByToken(request.headers.authorization);
      return response.status(httpStatus.OK).json(user);
    } catch (e)  {
      return response.status(e.httpStatus).json({ message: e.message });
    }
  }
}

module.exports = new UserController();
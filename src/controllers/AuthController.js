const httpStatus = require('../helpers/httpStatus');
const userService = require('../services/userService');

class AuthController {
  async getToken(request, response) {
    try {
      const user = await userService.create(request.body);
      return response.status(httpStatus.CREATED).json(user);
    } catch (e)  {
      return response.status(e.httpStatus).json({ message: e.message });
    }
  }
}

module.exports = new AuthController();
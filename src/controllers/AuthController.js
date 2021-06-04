const httpStatus = require('../helpers/httpStatus');
const authService = require('../services/authService');

class AuthController {
  async getToken(request, response) {
    try {
      const { token } = await authService.getTokenByUser(request.body);
      return response.status(httpStatus.OK).json({ token });
    } catch (e)  {
      return response.status(e.httpStatus).json({ message: e.message });
    }
  }
}

module.exports = new AuthController();
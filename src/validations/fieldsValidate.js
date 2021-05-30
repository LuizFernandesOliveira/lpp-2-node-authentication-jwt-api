const httpStatus = require('../helpers/httpStatus');
const message = require('../helpers/message');
const UserException = require('../exceptions/userException');

module.exports = {
  emailRequired(email) {
    if (email === undefined) {
      throw new UserException(message.USER_VALID_EMAIL_REQUIRED, httpStatus.BAD_REQUEST);
    }
  },
  
  emailInvalid(email) {
    const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.([a-z]+)?$/i;
    if (!regexEmail.test(email)) {
      throw new UserException(message.USER_VALID_EMAIL_INVALID, httpStatus.BAD_REQUEST);
    }
  },
  
  passwordRequired(password) {
    if (password === undefined) {
      throw new UserException(message.USER_VALID_PASSWORD_REQUIRED, httpStatus.BAD_REQUEST);
    }
  },
  
  passwordInvalid(password) {
    if (password.length < 6) {
      throw new UserException(message.USER_VALID_PASSWORD_INVALID, httpStatus.BAD_REQUEST);
    }
  },
};

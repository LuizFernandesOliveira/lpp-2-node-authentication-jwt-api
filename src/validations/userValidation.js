const httpStatus = require('../helpers/httpStatus');
const message = require('../helpers/message');
const UserException = require('../exceptions/userException');

function emailRequired(email) {
  if (email === undefined) {
    throw new UserException(message.USER_VALID_EMAIL_REQUIRED, httpStatus.BAD_REQUEST);
  }
}

const userCreateValidate = (email) => {
  emailRequired(email);
};

module.exports = {
  userCreateValidate,
};

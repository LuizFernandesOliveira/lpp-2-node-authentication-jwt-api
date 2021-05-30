const fields = require('./fieldsValidate');

const userCreateValidate = (email, password) => {
  fields.emailRequired(email);
  fields.emailInvalid(email);
  fields.passwordRequired(password);
  fields.passwordInvalid(password);
};

module.exports = {
  userCreateValidate,
};

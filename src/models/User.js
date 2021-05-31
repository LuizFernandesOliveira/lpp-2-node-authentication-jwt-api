const message = require('../helpers/message');

const defineUserModel = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
      notNull: {
        msg: message.USER_VALID_EMAIL_REQUIRED
      },
      isEmail: {
        msg: message.USER_VALID_EMAIL_INVALID,
      },
     },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: message.USER_VALID_PASSWORD_REQUIRED,
        },
        len: {
          args: [6, 30],
          msg: message.USER_VALID_PASSWORD_INVALID,
        },
      },
    },
  }, { timestamps: false });

  return User;
};

module.exports = defineUserModel;

const message = require('../helpers/message');

const { User } = require('./index');

const defineUserModel = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: message.USER_VALID_NAME_REQUIRED,
        },
        notEmpty: {
          msg: message.USER_VALID_NAME_INVALID,
        },
      },
    },
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
      emailExists: async function(email) {
        const user = await User.findAll({ where: { email } });
        if (user.length !== 0) {
          throw new Error(message.USER_ALREADY_EXISTS);
        }
      }
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

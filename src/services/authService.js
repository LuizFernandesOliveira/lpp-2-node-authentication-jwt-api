require('dotenv/config');
const jwt = require('jsonwebtoken');
const httpStatus = require('../helpers/httpStatus');
const UserException = require('../exceptions/userException');
const message = require('../helpers/message');

const { User } = require('../models');

const SECRET = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};
    
const findUserByEmailAndPassword = async (email, password) => {
  const userByEmail = await User.findOne({ where: { email, password } });

  if (userByEmail === null) {
    throw new UserException(message.USER_NOT_FOUND, httpStatus.BAD_REQUEST);
  }

  return userByEmail;
};

module.exports = {
  async getTokenByUser(user) {
    const { email, password } = user;
    await findUserByEmailAndPassword(email || null, password || null);

    const token = jwt.sign({ data: { email } }, SECRET, jwtConfig);
    return { token };
  },

  async getUserByToken(token) {
    if (!token) {
      throw new UserException(message.TOKEN_NOT_FOUND, httpStatus.UNAUTHORIZED);
    }
    try {
      const { data } = jwt.verify(token, SECRET);
      const user = await User.findOne({ where: { email: data.email } });
      if (!user) {
        throw new UserException(message.TOKEN_INVALID, httpStatus.UNAUTHORIZED);
      }
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    } catch (e) {
      throw new UserException(message.TOKEN_INVALID, httpStatus.UNAUTHORIZED);
    }
  },
};

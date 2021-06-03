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
  const userByEmail =  User.findOne({ where: { email, password } });
  if (userByEmail === null) {
    throw new UserException(message.USER_NOT_FOUND, httpStatus.BAD_REQUEST);
  }
  return userByEmail;
};

module.exports = {
  async getTokenByUser(user) {
    const { email, password } = user;
    const userByEmailAndPassword = await findUserByEmailAndPassword(email, password);

    const token = jwt.sign({ data: { email } }, SECRET, jwtConfig);
  },
};
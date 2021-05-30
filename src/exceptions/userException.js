function userException(message, httpStatus) {
  this.message = message;
  this.httpStatus = httpStatus;
}

module.exports = userException;

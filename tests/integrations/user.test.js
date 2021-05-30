const request = require('supertest');
const app = require('../../src/app');
const httpStatus = require('../../src/helpers/httpStatus');
const message = require('../../src/helpers/message');

const URL = 'http://localhost:3333';

describe('[ AUTHENTICATION ]', () => {
  it('verifica se o email é obrigatório.', async () => {
    const response = await request(app)
      .post('/users')
      .send({  password: 'luiz123' });
    const { status, body } = response;
    expect(status).toBe(httpStatus.BAD_REQUEST);
    expect(body.message).toBe(message.USER_VALID_EMAIL_REQUIRED);
  });
});

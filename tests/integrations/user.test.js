const request = require('supertest');
const app = require('../../src/app');
const httpStatus = require('../../src/helpers/httpStatus');
const message = require('../../src/helpers/message');

const URL = 'http://localhost:3333';

describe('[ AUTHENTICATION ] validation Email', () => {
  it('verifica se o email é obrigatório.', async () => {
    const response = await request(app)
      .post('/users')
      .send({ password: 'luiz123', name: 'Luiz Fernandes de Oliveira' });
    const { status, body } = response;
    expect(status).toBe(httpStatus.BAD_REQUEST);
    expect(body.message).toBe(message.USER_VALID_EMAIL_REQUIRED);
  });

  it('verifica se o email digitado é inválido.', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        email: 'luizfernandesoliveiraoficial@',
        password: 'luiz123',
        name: 'Luiz Fernandes de Oliveira',
      });
    const { status, body } = response;
    expect(status).toBe(httpStatus.BAD_REQUEST);
    expect(body.message).toBe(message.USER_VALID_EMAIL_INVALID);
  });
});

describe('[ AUTHENTICATION ] validation Password', () => {
  it('verifica se o password é obrigatório.', async () => {
    const response = await request(app)
      .post('/users')
      .send({ email: 'luizfernandesoliveiraoficial@gmail.com', name: 'Luiz Fernandes de Oliveira' });
    const { status, body } = response;
    expect(status).toBe(httpStatus.BAD_REQUEST);
    expect(body.message).toBe(message.USER_VALID_PASSWORD_REQUIRED);
  });

  it('verifica se o password digitado é inválido.', async () => {
    const response = await request(app)
      .post('/users')
      .send({ email: 'luizfernandesoliveiraoficial@gmail.com', password: 'luiz', name: 'Luiz Fernandes de Oliveira' });
    const { status, body } = response;
    expect(status).toBe(httpStatus.BAD_REQUEST);
    expect(body.message).toBe(message.USER_VALID_PASSWORD_INVALID);
  });
});

describe('[ AUTHENTICATION ] validation name', () => {
  it('verifica se o name é obrigatório.', async () => {
    const response = await request(app)
      .post('/users')
      .send({ email: 'luizfernandesoliveiraoficial@gmail.com', password: 'luiz123'});
    const { status, body } = response;
    expect(status).toBe(httpStatus.BAD_REQUEST);
    expect(body.message).toBe(message.USER_VALID_NAME_REQUIRED);
  });

  it('verifica se o name digitado é inválido.', async () => {
    const response = await request(app)
      .post('/users')
      .send({ email: 'luizfernandesoliveiraoficial@gmail.com', password: 'luiz123', name: "" });
    const { status, body } = response;
    expect(status).toBe(httpStatus.BAD_REQUEST);
    expect(body.message).toBe(message.USER_VALID_NAME_INVALID);
  });
});

describe('[ AUTHENTICATION ] not possible create user with email exists', () => {
  it('verifica se o usuário é cadastrado com sucesso.', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        email: 'luizfernandesoliveiraoficial@gmail.com',
        password: 'luiz123',
        name: 'Luiz Fernandes de Oliveira',
      });
    const { status, body } = response;
    expect(status).toBe(httpStatus.BAD_REQUEST);
    expect(body.message).toBe(message.USER_ALREADY_EXISTS);
  });
});
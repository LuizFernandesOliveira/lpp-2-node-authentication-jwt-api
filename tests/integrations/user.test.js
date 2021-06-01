const frisby = require('frisby');
const httpStatus = require('../../src/helpers/httpStatus');
const message = require('../../src/helpers/message');

const URL = 'http://localhost:3333';

describe('[ CREATE USER ]', () => {

  describe('validation Email', () => {
    it('verifica se o email é obrigatório.', async () => {
      await frisby.post(`${URL}/users`, {
        password: 'luiz123',
        name: 'Luiz Fernandes de Oliveira',
      })
        .expect('status', httpStatus.BAD_REQUEST)
        .then((response) => {
          const result = JSON.parse(response.body);
          expect(result.message).toBe(message.USER_VALID_EMAIL_REQUIRED);
        });
    });

    it('verifica se o email digitado é inválido.', async () => {
      await frisby.post(`${URL}/users`, {
          email: 'luizfernandesoliveiraoficial@',
          password: 'luiz123',
          name: 'Luiz Fernandes de Oliveira',
        })
        .expect('status', httpStatus.BAD_REQUEST)
        .then((response) => {
          const result = JSON.parse(response.body);
          expect(result.message).toBe(message.USER_VALID_EMAIL_INVALID);
        });
    });
  });

  describe('validation Password', () => {
    it('verifica se o password é obrigatório.', async () => {
      await frisby.post(`${URL}/users`, {
          email: 'luizfernandesoliveiraoficial@gmail.com',
          name: 'Luiz Fernandes de Oliveira',
        })
        .expect('status', httpStatus.BAD_REQUEST)
        .then((response) => {
          const result = JSON.parse(response.body);
          expect(result.message).toBe(message.USER_VALID_PASSWORD_REQUIRED);
        });
    });

    it('verifica se o password digitado é inválido.', async () => {
      await frisby.post(`${URL}/users`, {
          email: 'luizfernandesoliveiraoficial@gmail.com',
          password: '123',
          name: 'Luiz Fernandes de Oliveira',
        })
        .expect('status', httpStatus.BAD_REQUEST)
        .then((response) => {
          const result = JSON.parse(response.body);
          expect(result.message).toBe(message.USER_VALID_PASSWORD_INVALID);
        });
    });
  });

  describe('validation name', () => {
    it('verifica se o name é obrigatório.', async () => {
      await frisby.post(`${URL}/users`, {
          email: 'luizfernandesoliveiraoficial@gmail.com',
          password: '1luiz12323',
        })
        .expect('status', httpStatus.BAD_REQUEST)
        .then((response) => {
          const result = JSON.parse(response.body);
          expect(result.message).toBe(message.USER_VALID_NAME_REQUIRED);
        });
    });

    it('verifica se o name digitado é inválido.', async () => {
      await frisby.post(`${URL}/users`, {
          email: 'luizfernandesoliveiraoficial@gmail.com',
          password: 'luiz123',
          name: '',
        })
        .expect('status', httpStatus.BAD_REQUEST)
        .then((response) => {
          const result = JSON.parse(response.body);
          expect(result.message).toBe(message.USER_VALID_NAME_INVALID);
        });
    });
  });

  describe('not possible create user with email exists', () => {
    it('verifica se o email digitado já existe.', async () => {
      await frisby.post(`${URL}/users`, {
          email: 'luizfernandesoliveiraoficial@gmail.com',
          password: 'luiz123',
          name: 'Luiz Fernandes de Oliveira',
        })
        .expect('status', httpStatus.BAD_REQUEST)
        .then((response) => {
          const result = JSON.parse(response.body);
          expect(result.message).toBe(message.USER_ALREADY_EXISTS);
        });
    });
  });

  describe('should be created user with success', () => {
    it('verifica se o usuario foi criado com sucesso.', async () => {
      await frisby.post(`${URL}/users`, {
          email: 'luizfernandesoliveiraoficial2@gmail.com',
          password: 'luiz123',
          name: 'Nando',
        })
        .expect('status', httpStatus.CREATED)
        .then((response) => {
          const result = JSON.parse(response.body);
          expect(result.email).toBe('luizfernandesoliveiraoficial2@gmail.com');
        });
    });
  });
});

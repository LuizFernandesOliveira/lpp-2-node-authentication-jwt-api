const frisby = require('frisby');
const httpStatus = require('../../src/helpers/httpStatus');
const message = require('../../src/helpers/message');

const URL = 'http://localhost:3333';

describe('[ AUTHENTICATION ]', () => {
  describe('validation credentials', () => {
    it('verifica se o email ou a senha está errada.', async () => {
      await frisby.post(`${URL}/token`, {
        email: 'luiz@gmail.com',
        password: 'luiz123',
      })
        .expect('status', httpStatus.BAD_REQUEST)
        .then((response) => {
          const result = JSON.parse(response.body);
          expect(result.message).toBe(message.USER_NOT_FOUND);
        });
    });

    it('verifica se o token é recebido com as credenciais corretas', async () => {
      await frisby.post(`${URL}/token`, {
        email: 'luizfernandesoliveiraoficial@gmail.com',
        password: 'luiz123',
      })
        .expect('status', httpStatus.OK)
        .then((response) => {
          const result = JSON.parse(response.body);
          expect(result.token).not.toBe(null);
        });
    });
  });
});

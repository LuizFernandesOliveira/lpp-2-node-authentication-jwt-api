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
          email: 'luizfernandesoliveiraoficial3@gmail.com',
          password: 'luiz123',
          name: 'Nando',
        })
        .expect('status', httpStatus.CREATED)
        .then((response) => {
          const result = JSON.parse(response.body);
          expect(result.email).toBe('luizfernandesoliveiraoficial3@gmail.com');
        });
    });
  });
});

describe('[ GET USER ]', () => {
  it('verifica que o token é obrigatório', async () => {
    await frisby
      .get(`${URL}/users`)
      .expect('status', httpStatus.UNAUTHORIZED)
      .then((response) => {
        const result = JSON.parse(response.body);
        expect(result.message).toBe(message.TOKEN_NOT_FOUND);
      });
  });

  it('verifica que não é possível acessar usuario com token invalido', async () => {
    let token = 'ytsafy98ahd98h';

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${URL}/users`)
      .expect('status', httpStatus.UNAUTHORIZED)
      .then((response) => {
        const result = JSON.parse(response.body);
        expect(result.message).toBe(message.TOKEN_INVALID);
      });
  });

  it('verifica se retorna os dados do usuario pelo token corretamente', async () => {
    let token;
    await frisby.post(`${URL}/token`, {
        email: 'luizfernandesoliveiraoficial@gmail.com',
        password: 'luiz123',
      })
        .expect('status', httpStatus.OK)
        .then((response) => {
          const result = JSON.parse(response.body);
          token = result.token;
        });

    await frisby.setup({
          request: {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          },
        })
        .get(`${URL}/users`)
        .expect('status', httpStatus.OK)
        .then((response) => {
          const { name, email } = JSON.parse(response.body);
          expect(name).toBe('Luiz Fernandes de Oliveira');
          expect(email).toBe('luizfernandesoliveiraoficial@gmail.com');
        });
  });
});

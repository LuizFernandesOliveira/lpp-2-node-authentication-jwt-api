'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      name: 'Luiz Fernandes de Oliveira',
      email: 'luizfernandesoliveiraoficial@gmail.com',
      password: 'luiz123',
    }], { timestamps: false });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

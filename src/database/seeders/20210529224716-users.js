'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash('luiz123', 8);

    await queryInterface.bulkInsert('Users', [{
      name: 'Luiz Fernandes de Oliveira',
      email: 'luizfernandesoliveiraoficial@gmail.com',
      password,
    }], { timestamps: false });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

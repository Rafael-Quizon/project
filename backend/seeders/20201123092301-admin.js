'use strict';
const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const users = await queryInterface.bulkInsert('users', [
      {
        id: 1,
        firstName: 'Ad',
        lastName: 'Mean',
        branchId: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ])

    await queryInterface.bulkInsert('accounts', [
      {
        userId: users,
        username: 'admin',
        password: await bcrypt.hash('admin', bcrypt.genSaltSync(8)),
        accountType: 'admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', { id: 1 });
  }
};

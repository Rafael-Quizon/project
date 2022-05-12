'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subjectCode: {
        type: Sequelize.STRING
      },
      subjectName: {
        type: Sequelize.STRING
      },
      units: {
        type: Sequelize.FLOAT
      },
      hour: {
        type: Sequelize.STRING
      },
      subjectCategory: {
        type: Sequelize.STRING
      },
      faculty: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('courses');
  }
};
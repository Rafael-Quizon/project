'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      middleName: {
        allowNull: true,
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      birthday: {
        type: Sequelize.INTEGER
      },
      gender: {
        type: Sequelize.INTEGER
      },
      
      province: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      houseNo: {
        type: Sequelize.STRING
      },
      nationality: {
        type: Sequelize.STRING
      },
      collegeDepartment: {
        type: Sequelize.STRING
      },
      course: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      contactNumber: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      religion: {
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      branchId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        onUpdate: 'cascade',
        references: {
          model: 'branches',
          key: 'id'
        }
      },
      paymentStatus: {
        allowNull: false,
        type: Sequelize.ENUM('paid','pending','unpaid'),
        defaultValue: 'unpaid'
      },
      processedBy: {
        allowNull: true,
        type: Sequelize.INTEGER,
        onUpdate: 'cascade',
        references: {
          model: 'users',
          key: 'id'
        }
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
    await queryInterface.dropTable('students');
  }
};
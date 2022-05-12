'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('studentCourses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      studentsId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: 'cascade',
        onUpdate: 'cascade',
        references: {
          model: 'students',
          key: 'id'
        }
      },
    //   coursesId: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false,
    //     onDelete: 'cascade',
    //     onUpdate: 'cascade',
    //     references: {
    //       model: 'courses',
    //       key: 'id'
    //     },
    //   },
      coursesId: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('studentCourses');
  }
};
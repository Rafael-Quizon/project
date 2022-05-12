'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasOne(models.accounts, { foreignKey: 'userId', as: 'accountUsers' })
      users.hasMany(models.students, { foreignKey: 'processedBy', as: 'studentUsers' })
      users.belongsTo(models.branches, { foreignKey: 'branchId', as: 'userBranches' })
    }
  };
  users.init({
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    branchId: DataTypes.INTEGER,
    salary: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
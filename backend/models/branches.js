'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class branches extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      branches.hasMany(models.users, { foreignKey: 'branchId', as: 'userBranches' })
      branches.hasMany(models.students, { foreignKey: 'branchId', as: 'studentBranches' })
    }
  };
  branches.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'branches',
  });
  return branches;
};
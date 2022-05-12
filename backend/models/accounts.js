'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  class accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      accounts.belongsTo(models.users, { foreignKey: 'userId', as: 'accountUsers' })
    }

    generateHash(password) {
      return bcrypt.hash(password, bcrypt.genSaltSync(8));
    }

    validPassword(password) {
      return bcrypt.compare(password, this.password);
    }

  };
  accounts.init({
    userId: DataTypes.INTEGER,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    accountType: DataTypes.ENUM('admin', 'accountant'),
    isLoggedIn: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'accounts',
  });
  return accounts;
};
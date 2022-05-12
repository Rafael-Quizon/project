'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      students.belongsTo(models.branches, { foreignKey: 'branchId', as: 'studentBranches' })
      students.belongsTo(models.users, { foreignKey: 'processedBy', as: 'studentUsers' })
      students.belongsToMany(models.courses, { as: 'studentList', through: models.studentCourses, foreignKey: 'studentsId'})
      students.hasOne(models.payments, { foreignKey: 'studentId', as: 'paymentStudents' })
    }
  };
  students.init({
    firstName: DataTypes.STRING,
    middleName: DataTypes.STRING,
    lastName: DataTypes.STRING, 
    age: DataTypes.INTEGER,
    birthday: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    houseNo: DataTypes.STRING,
    nationality: DataTypes.STRING,
    collegeDepartment: DataTypes.STRING,
    course: DataTypes.STRING,
    year: DataTypes.STRING,
    contactNumber: DataTypes.INTEGER,
    email: DataTypes.STRING,
    religion: DataTypes.STRING,
    branchId: DataTypes.INTEGER,
    paymentStatus: DataTypes.ENUM('paid', 'pending', 'unpaid'),
    processedBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'students',
  });
  return students;
};
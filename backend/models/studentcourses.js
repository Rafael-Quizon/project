'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class studentCourses extends Model {
     
    static associate(models) {
        studentCourses.belongsTo(models.students, { foreignKey: 'studentsId', targetKey: 'id', as: 'studentList' });
        studentCourses.belongsTo(models.courses, { foreignKey: 'coursesId', targetKey: 'id', as: 'courseList' });
    }
  };
  studentCourses.init({
    studentsId: DataTypes.INTEGER,
    coursesId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'studentCourses',
  });
  return studentCourses;
};
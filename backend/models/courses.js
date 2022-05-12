'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      courses.belongsToMany(models.students, { as: 'courseList', through: models.studentCourses, foreignKey: 'coursesId'});
      
    }
  };
  courses.init({
    subjectCode: DataTypes.STRING,
    subjectName: DataTypes.STRING,
    units: DataTypes.FLOAT,
    hour: DataTypes.STRING,
    subjectCategory: DataTypes.STRING,
    faculty: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'courses',
  });
  return courses;
};
const models = require('../models')
const Courses = models.courses
const Students = models.students
const StudentCourses = models.studentcourses
const { messageBuilder, MSG_SUCCESS, MSG_ERROR, MSG_FAILED } = require('../helpers/messageHandler')

exports.create = async (req, res) => {
    await StudentCourses.create({
        studentId: req.body.studentId,
        courseId: req.body.courseId
    }).then(async (studentcourse) => {
        if (studentcourse) {
            res.json(messageBuilder(
                MSG_SUCCESS,
                'Successfully added a course!',
                null
            ))
        } else {
            res.json(messageBuilder(
                MSG_FAILED,
                'Cannot add a course!',
                null))
        }
    }).catch(err => {
        res.status(500).json(messageBuilder(
            MSG_ERROR,
            err.message || "Cannot add a course!",
            null
        ));
    })
}

exports.deleteById = async (req, res) => {
    await StudentCourses.findOne({
        where: {
            id: req.params.id
        }
    }).then(async (studentcourses) => {
        if (studentcourses) {
            await StudentCourses.destroy({
                where: {
                    id: req.params.id
                }
            }).then(studentcourse => {
                if (studentcourse) {
                    res.json(messageBuilder(
                        MSG_SUCCESS,
                        'Successfully deleted a student course!',
                        null
                    ))
                } else {
                    res.json(messageBuilder(
                        MSG_FAILED,
                        'Cannot delete a student course!',
                        null))
                }
            }).catch(err => {
                res.status(500).json(messageBuilder(
                    MSG_ERROR,
                    err.message || "Cannot delete a student course!",
                    null
                ));
            })
        } else {
            res.json(messageBuilder(
                MSG_FAILED,
                'Student course does not exist!',
                null))
        }
    }).catch(err => {
        res.status(500).json(messageBuilder(
            MSG_ERROR,
            err.message || "Cannot delete a students course!",
            null
        ));
    })
}

exports.update = async (req, res) => {
    await StudentCourses.findOne({
        where: {
            id: req.body.id
        }
    }).then(async (studentcourses) => {
        if (studentcourses) {
            await StudentCourses.update(
                {
                    studentId: req.body.studentId,
                    courseId: req.body.courseId
                },
                {
                    where: { id: req.body.id }
                }).then(async (studentcourse) => {
                    if (studentcourse) {
                        res.json(
                            messageBuilder(
                                MSG_SUCCESS,
                                'Successfully updated a student courses!',
                                null
                            ))
                    } else {
                        res.json(messageBuilder(
                            MSG_FAILED,
                            'Cannot update a student course!',
                            null))
                    }
                }).catch(err => {
                    res.status(500).json(messageBuilder(
                        MSG_ERROR,
                        err.message || "Cannot update a student course!",
                        null
                    ));
                })
        } else {
            res.json(messageBuilder(
                MSG_FAILED,
                'Student course does not exist!',
                null))
        }
    }).catch(err => {
        res.status(500).json(messageBuilder(
            MSG_ERROR,
            err.message || "Cannot update a student course!",
            null
        ));
    })
}

exports.findAll = async (req, res) => {
    await StudentCourses.findAll({
        include: [{
            model: Students,
            as: 'studentList',
            attributes: ['id']
        }, {
            model: Courses,
            as: 'courseList',
            attributes: ['id', 'subjectCode', 'subjectName', 'units', 'hour', 'subjectCategory', 'faculty']
        }],
        attributes: ['id', 'studentId', 'courseId']
    }).then(studentcourses => {
        if (studentcourses) {
            res.json(messageBuilder(MSG_SUCCESS, null, studentcourses))
        } else {
            res.json(messageBuilder(
                MSG_FAILED,
                'Student courses table is empty',
                null))
        }
    }).catch(err => {
        res.status(500).json(messageBuilder(
            MSG_ERROR,
            err.message || "Cannot get student courses!",
            null
        ));
    })
}
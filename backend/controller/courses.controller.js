const models = require('../models')
const Courses = models.courses
const { messageBuilder, MSG_SUCCESS, MSG_ERROR, MSG_FAILED } = require('../helpers/messageHandler')
const { sequelize } = require('../models')

exports.create = async (req, res) => {
    await Courses.findOne({
        where: {
            subjectCode: req.body.subjectCode
        }
    }).then(async (course) => {
        if (!course) {
            Courses.create({
                subjectCode: req.body.subjectCode,
                subjectName: req.body.subjectName,
                units: req.body.units,
                hour: req.body.hour,
                subjectCategory: req.body.subjectCategory,
                faculty: req.body.faculty
            }).then(async (courses) => {
                if (courses) {
                    res.json(messageBuilder(
                        MSG_SUCCESS,
                        'Successfully created a course!',
                        null
                    ))
                } else {
                    res.json(messageBuilder(
                        MSG_FAILED,
                        'Cannot create a course!',
                        null))
                }
            }).catch(err => {
                res.status(500).json(messageBuilder(
                    MSG_ERROR,
                    err.message || "Cannot create a course!",
                    null
                ));
            })
        } else {
            res.json(messageBuilder(
                MSG_FAILED,
                'Subject Code already exists!',
                null))
        }
    }).catch(err => {
        res.status(500).json(messageBuilder(
            MSG_ERROR,
            err.message || "Cannot create a course!",
            null
        ));
    })
}

exports.deleteById = async (req, res) => {
    await Courses.findOne({
        where: {
            id: req.params.id
        }
    }).then(async (courses) => {
        if (courses) {
            await Courses.destroy({
                where: {
                    id: req.params.id
                }
            }).then(course => {
                if (course) {
                    res.json(messageBuilder(
                        MSG_SUCCESS,
                        'Successfully deleted a course!',
                        null
                    ))
                } else {
                    res.json(messageBuilder(
                        MSG_FAILED,
                        'Cannot delete a course!',
                        null))
                }
            }).catch(err => {
                res.status(500).json(messageBuilder(
                    MSG_ERROR,
                    err.message || "Cannot delete a course!",
                    null
                ));
            })
        } else {
            res.json(messageBuilder(
                MSG_FAILED,
                'Course does not exist!',
                null))
        }
    }).catch(err => {
        res.status(500).json(messageBuilder(
            MSG_ERROR,
            err.message || "Cannot delete a course!",
            null
        ));
    })
}

exports.update = async (req, res) => {
    await Courses.findOne({
        where: {
            id: req.body.id
        }
    }).then(async (courses) => {
        if (courses) {
            await Courses.update(
                {
                    subjectCode: req.body.subjectCode,
                    subjectName: req.body.subjectName,
                    units: req.body.units,
                    hour: req.body.hour,
                    subjectCategory: req.body.subjectCategory,
                    faculty: req.body.faculty
                },
                {
                    where: { id: req.body.id }
                }).then(async (course) => {
                    if (course) {
                        res.json(
                            messageBuilder(
                                MSG_SUCCESS,
                                'Successfully updated a course!',
                                null
                            ))
                    } else {
                        res.json(messageBuilder(
                            MSG_FAILED,
                            'Cannot update a course!',
                            null))
                    }
                }).catch(err => {
                    res.status(500).json(messageBuilder(
                        MSG_ERROR,
                        err.message || "Cannot update a course!",
                        null
                    ));
                })
        } else {
            res.json(messageBuilder(
                MSG_FAILED,
                'Course does not exist!',
                null))
        }
    }).catch(err => {
        res.status(500).json(messageBuilder(
            MSG_ERROR,
            err.message || "Cannot update a course!",
            null
        ));
    })
}

exports.findAll = async (req, res) => {
    await Courses.findAll({
        attributes: ['id', 'subjectCode', 'subjectName', 'units', 'hour', 'subjectCategory', 'faculty']
    }).then(courses => {
        if (courses) {
            res.json(messageBuilder(MSG_SUCCESS, null, courses))
        } else {
            res.json(messageBuilder(
                MSG_FAILED,
                'Course table is empty',
                null))
        }
    }).catch(err => {
        res.status(500).json(messageBuilder(
            MSG_ERROR,
            err.message || "Cannot get courses!",
            null
        ));
    })
}

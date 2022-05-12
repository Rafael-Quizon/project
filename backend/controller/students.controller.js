const models = require('../models')
const Students = models.students
const Users = models.users
const Branches = models.branches
const Payments = models.payments
const { messageBuilder, MSG_SUCCESS, MSG_ERROR, MSG_FAILED } = require('../helpers/messageHandler')
const { studentSearchQueryBuilder } = require('../helpers/queryHandler')

exports.create = async (req, res) => {
    await Students.create({
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        age: req.body.age,
        birthday: req.body.bday,
        gender: req.body.gender,
        province: req.body.province,
        city: req.body.city,
        houseNo: req.body.house,
        nationality: req.body.nationality,
        collegeDepartment: req.body.collegedept,
        course: req.body.course,
        year: req.body.year,
        contactNumber: req.body.contact,
        email: req.body.email,
        religion: req.body.religion,
        branchId: req.body.branchId,
        paymentStatus: req.body.paymentStatus,
        processedBy: req.body.processedBy
    }).then(async (students) => {
        await Payments.create({
            studentId: students.id,
            amount: req.body.amount
        }).then(payment => {
            if (payment) {
                res.json(messageBuilder(
                    MSG_SUCCESS,
                    'Successfully created a student!',
                    null
                ))
            } else {
                res.json(messageBuilder(
                    MSG_FAILED,
                    'Cannot create a student!',
                    null))
            }
        }).catch(err => {
            res.status(500).json(messageBuilder(
                MSG_ERROR,
                err.message || "Cannot create a student!",
                null
            ));
        })
    }).catch(err => {
        res.status(500).json(messageBuilder(
            MSG_ERROR,
            err.message || "Cannot create a student!",
            null
        ));
    })
}

exports.deleteById = async (req, res) => {
    await Students.findOne({
        where: {
            id: req.params.id
        }
    }).then(async (students) => {
        if (students) {
            await Students.destroy({
                where: {
                    id: req.params.id
                }
            }).then(student => {
                if (student) {
                    res.json(messageBuilder(
                        MSG_SUCCESS,
                        'Successfully deleted a student!',
                        null
                    ))
                } else {
                    res.json(messageBuilder(
                        MSG_FAILED,
                        'Cannot delete a student!',
                        null))
                }
            }).catch(err => {
                res.status(500).json(messageBuilder(
                    MSG_ERROR,
                    err.message || "Cannot delete a student!",
                    null
                ));
            })
        } else {
            res.json(messageBuilder(
                MSG_FAILED,
                'Student does not exist!',
                null))
        }
    }).catch(err => {
        res.status(500).json(messageBuilder(
            MSG_ERROR,
            err.message || "Cannot delete a student!",
            null
        ));
    })
}

exports.update = async (req, res) => {
    await Students.findOne({
        where: {
            id: req.body.id
        }
    }).then(async (students) => {
        if (students) {
            await Students.update(
                {
                    firstName: req.body.firstName,
                    middleName: req.body.middleName,
                    lastName: req.body.lastName,
                    age: req.body.age,
                    bday: req.body.bday,
                    gender: req.body.gender,
                    province: req.body.province,
                    city: req.body.city,
                    houseNo: req.body.house,  
                    nationality: req.body.nationality,
                    collegeDepartment: req.body.collegedept,
                    course: req.body.course,
                    year: req.body.year,
                    contactNumber: req.body.contact,
                    email: req.body.email,
                    religion: req.body.religion,
                    branchId: req.body.branchId,
                    paymentStatus: req.body.paymentStatus ? req.body.paymentStatus : students.paymentStatus,
                    processedBy: req.body.processedBy ? req.body.processedBy : students.processedBy
                },
                {
                    where: { id: req.body.id }
                }).then(async (student) => {
                    if (student) {
                        if (req.body.amount) {
                            await Payments.update(
                                {
                                    amount: req.body.amount
                                }, {
                                where: { studentId: req.body.id }
                            }).then(payment => {
                                res.json(messageBuilder(
                                    MSG_SUCCESS,
                                    'Successfully updated a student!',
                                    null
                                ))
                            }).catch(err => {
                                res.status(500).json(messageBuilder(
                                    MSG_ERROR,
                                    err.message || "Cannot update a student!",
                                    null
                                ));
                            })
                        }

                        res.json(
                            messageBuilder(
                                MSG_SUCCESS,
                                'Successfully updated a student!',
                                null
                            ))
                    } else {
                        res.json(messageBuilder(
                            MSG_FAILED,
                            'Cannot update a student!',
                            null))
                    }
                }).catch(err => {
                    res.status(500).json(messageBuilder(
                        MSG_ERROR,
                        err.message || "Cannot update a student!",
                        null
                    ));
                })
        } else {
            res.json(messageBuilder(
                MSG_FAILED,
                'Student does not exist!',
                null))
        }
    }).catch(err => {
        res.status(500).json(messageBuilder(
            MSG_ERROR,
            err.message || "Cannot update a student!",
            null
        ));
    })
}

exports.findById = async (req, res) => {
    await Students.findOne({
        where: {
            id: req.params.id
        }, include: [{
            model: Branches,
            as: 'studentBranches',
            attributes: ['name']
        }, {
            model: Users,
            as: 'studentUsers',
            attributes: ['firstName', 'middleName', 'lastName']
        }, {
            model: Payments,
            as: 'paymentStudents',
            attributes: ['amount']
        }],
        attributes: ['id', 'firstName', 'middleName', 'lastName', 'age', 'birthday', 'gender', 'province', 'city', 'houseNo', 'nationality', 'collegeDepartment', 'course', 'year', 'contactNumber', 'email', 'religion', 'paymentStatus', 'branchId']
    }).then(async (student) => {
        if (student) {
            res.json(messageBuilder(MSG_SUCCESS, null, student))
        } else {
            res.json(messageBuilder(
                MSG_FAILED,
                'Student does not exist!',
                null))
        }
    }).catch(err => {
        res.status(500).json(messageBuilder(
            MSG_ERROR,
            err.message || "Cannot delete a student!",
            null
        ));
    })
}

exports.findAll = async (req, res) => {
    await Students.findAll({
        include: [{
            model: Branches,
            as: 'studentBranches',
            attributes: ['name']
        }, {
            model: Users,
            as: 'studentUsers',
            attributes: ['firstName', 'middleName', 'lastName']
        }, {
            model: Payments,
            as: 'paymentStudents',
            attributes: ['id', 'amount', 'createdAt']
        }, {
            model: Payments,
            as: 'paymentStudents',
            attributes: ['amount']
        }],
        attributes: ['id', 'firstName', 'middleName', 'lastName', 'paymentStatus', 'branchId']
    }).then(students => {
        if (students) {
            res.json(messageBuilder(MSG_SUCCESS, null, students))
        } else {
            res.json(messageBuilder(
                MSG_FAILED,
                'Student table is empty',
                null))
        }
    }).catch(err => {
        res.status(500).json(messageBuilder(
            MSG_ERROR,
            err.message || "Cannot get students!",
            null
        ));
    })
}

exports.findByBranchId = async (req, res) => {
    await Students.findAll({
        where: {
            branchId: req.params.id
        }, include: [{
            model: Branches,
            as: 'studentBranches',
            attributes: ['name']
        }, {
            model: Users,
            as: 'studentUsers',
            attributes: ['firstName', 'middleName', 'lastName']
        }, {
            model: Payments,
            as: 'paymentStudents',
            attributes: ['amount']
        }],
        attributes: ['id', 'firstName', 'middleName', 'lastName', 'paymentStatus', 'branchId']
    }).then(students => {
        if (students) {
            res.json(messageBuilder(MSG_SUCCESS, null, students))
        } else {
            res.json(messageBuilder(
                MSG_FAILED,
                'Branch is empty!',
                null))
        }
    }).catch(err => {
        res.status(500).json(messageBuilder(
            MSG_ERROR,
            err.message || "Cannot get students!",
            null
        ));
    })
}

exports.search = async (req, res) => {
    await Students.findAll({
        where: {
            ...studentSearchQueryBuilder(req)
        }, include: [{
            model: Branches,
            as: 'studentBranches',
            attributes: ['name'],
        }, {
            model: Users,
            as: 'studentUsers',
            attributes: ['firstName', 'middleName', 'lastName']
        }, {
            model: Payments,
            as: 'paymentStudents',
            attributes: ['amount']
        }],
        attributes: ['id', 'firstName', 'middleName', 'lastName', 'paymentStatus', 'branchId']
    }).then(students => {
        if (students) {
            res.json(messageBuilder(MSG_SUCCESS, null, students))
        } else {
            res.json(messageBuilder(
                MSG_SUCCESS,
                null,
                null))
        }
    }).catch(err => {
        res.status(500).json(messageBuilder(
            MSG_ERROR,
            err.message || "Cannot get students!",
            null
        ));
    })
}

exports.countStatistics = async (req, res) => {
    await Students.findAll()
        .then(students => {
            let count = {
                paid: 0,
                unpaid: 0,
                pending: 0,
                total: 0
            }
            if (students) {
                for (var s in students) {
                    switch (students[s].paymentStatus) {
                        case 'paid':
                            count.paid += 1
                            break;
                        case 'unpaid':
                            count.unpaid += 1
                            break;
                        default:
                            count.pending += 1
                            break;
                    }
                }

                count.total = students.length
            }

            res.json(messageBuilder(MSG_SUCCESS, null, count))
        }).catch(err => {
            res.status(500).json(messageBuilder(
                MSG_ERROR,
                err.message || "Cannot count students!",
                null
            ));
        })
}
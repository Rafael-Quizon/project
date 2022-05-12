const { Op } = require('sequelize')

const studentSearchQueryBuilder = (req) => {
    let whereClause
    var key = req.body.key ? req.body.key : ""

    if (req.body.processedBy && req.body.branchId) {
        whereClause = {
            [Op.and]: {
                [Op.or]: {
                    firstName: {
                        [Op.like]: "%" + key + "%"
                    },
                    middleName: {
                        [Op.like]: "%" + key + "%"
                    },
                    lastName: {
                        [Op.like]: "%" + key + "%"
                    },
                    paymentStatus: {
                        [Op.like]: req.body.key
                    }
                },
                processedBy: {
                    [Op.eq]: req.body.processedBy
                },
                branchId: {
                    [Op.eq]: req.body.branchId
                }
            }
        }
    } else if (req.body.processedBy) {
        whereClause = {
            [Op.and]: {
                [Op.or]: {
                    firstName: {
                        [Op.like]: "%" + key + "%"
                    },
                    middleName: {
                        [Op.like]: "%" + key + "%"
                    },
                    lastName: {
                        [Op.like]: "%" + key + "%"
                    },
                    paymentStatus: {
                        [Op.like]: req.body.key
                    }
                },
                processedBy: {
                    [Op.eq]: req.body.processedBy
                }
            }
        }
    } else if (req.body.branchId) {
        whereClause = {
            [Op.and]: {
                [Op.or]: {
                    firstName: {
                        [Op.like]: "%" + key + "%"
                    },
                    middleName: {
                        [Op.like]: "%" + key + "%"
                    },
                    lastName: {
                        [Op.like]: "%" + key + "%"
                    },
                    paymentStatus: {
                        [Op.like]: req.body.key
                    }
                },
                branchId: {
                    [Op.eq]: req.body.branchId
                }
            }
        }
    } else {
        whereClause = {
            [Op.and]: {
                [Op.or]: {
                    firstName: {
                        [Op.like]: "%" + key + "%"
                    },
                    middleName: {
                        [Op.like]: "%" + key + "%"
                    },
                    lastName: {
                        [Op.like]: "%" + key + "%"
                    },
                    paymentStatus: {
                        [Op.like]: req.body.key
                    }
                }
            }
        }
    }

    return whereClause
}

const userSearchQueryBuilder = (req) => {
    var whereClause
    var key = req.body.key ? req.body.key : ""

    if (req.body.branchId) {
        whereClause = {
            [Op.and]: {
                [Op.or]: {
                    firstName: {
                        [Op.like]: "%" + key + "%"
                    },
                    middleName: {
                        [Op.like]: "%" + key + "%"
                    },
                    lastName: {
                        [Op.like]: "%" + key + "%"
                    },
                    '$accountUsers.username$': {
                        [Op.like]: "%" + key + "%"
                    }
                },
                branchId: {
                    [Op.eq]: req.body.branchId
                },
                id: {
                    [Op.not]: 1
                }
            }
        }
    } else {
        whereClause = {
            [Op.and]: {
                [Op.or]: {
                    firstName: {
                        [Op.like]: "%" + key + "%"
                    },
                    middleName: {
                        [Op.like]: "%" + key + "%"
                    },
                    lastName: {
                        [Op.like]: "%" + key + "%"
                    },
                    '$accountUsers.username$': {
                        [Op.like]: "%" + key + "%"
                    }
                },
                id: {
                    [Op.not]: 1
                }
            }
        }
    }
    return whereClause
}

module.exports = {
    studentSearchQueryBuilder,
    userSearchQueryBuilder
}
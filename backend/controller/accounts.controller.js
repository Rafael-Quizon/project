const models = require('../models')
const Accounts = models.accounts
const Users = models.users
const Branches = models.branches

const { Op } = require('sequelize')
const { sequelize } = require('../models')

const { userSearchQueryBuilder } = require('../helpers/queryHandler')
const { messageBuilder, MSG_SUCCESS, MSG_ERROR, MSG_FAILED } = require('../helpers/messageHandler')

exports.login = async (req, res) => {
    await Accounts.findOne({
        where: {
            username: req.body.username
        },
        attributes: ['username', 'password', 'accountType'],
        include: [{
            model: Users,
            as: 'accountUsers',
            attributes: ['id', 'firstName', 'lastName', 'branchId', 'salary']
        }]
    }).then(async (user) => {
        if (user) {
            let isValid = await user.validPassword(req.body.password)
            if (isValid) {
                user.password = ''
                res.json(messageBuilder(MSG_SUCCESS, null, user))
            } else {
                res.json(messageBuilder(
                    MSG_FAILED,
                    'Username and password does not match!',
                    null))
            }
        } else {
            res.json(messageBuilder(
                MSG_FAILED,
                'Username and password does not match!',
                null))
        }
    }).catch(err => {
        res.status(500).json(messageBuilder(
            MSG_ERROR,
            err.message || "Cannot login a user!",
            null
        ));
    })
}

exports.create = async (req, res) => {
    await Accounts.findOne({
        where: {
            username: req.body.username
        }
    }).then(async (account) => {
        if (!account) {
            Users.create({
                firstName: req.body.firstName,
                middleName: req.body.middleName,
                lastName: req.body.lastName,
                branchId: req.body.branchId,
                salary: req.body.salary
            }).then(async (user) => {
                if (user) {
                    var accountInstance = await Accounts.build({ username: "test" })
                    let password = await accountInstance.generateHash(req.body.password)
                    await accountInstance.destroy()
                    await Accounts.create({
                        userId: user.id,
                        username: req.body.username,
                        password: password,
                        accountType: "accountant"
                    }).then(account => {
                        res.json(messageBuilder(
                            MSG_SUCCESS,
                            'Successfully created a user!',
                            null
                        ))
                    }).catch(err => {
                        res.status(500).json(messageBuilder(
                            MSG_ERROR,
                            err.message || "Cannot create a user!",
                            null
                        ));
                    })
                } else {
                    res.json(messageBuilder(
                        MSG_FAILED,
                        'Cannot create a user!',
                        null))
                }
            })
        } else {
            res.json(messageBuilder(
                MSG_FAILED,
                'Username already exists!',
                null))
        }
    }).catch(err => {
        res.status(500).json(messageBuilder(
            MSG_ERROR,
            err.message || "Cannot create a user!",
            null
        ));
    })
}

exports.delete = async (req, res) => {
    await Users.findOne({
        where: {
            id: req.params.id
        }
    }).then(async (users) => {
        if (users) {
            await Users.destroy({
                where: {
                    id: req.params.id
                }
            }).then(user => {
                if (user) {
                    res.json(messageBuilder(
                        MSG_SUCCESS,
                        'Successfully deleted a user!',
                        null
                    ))
                } else {
                    res.json(messageBuilder(
                        MSG_FAILED,
                        'Cannot delete a user!',
                        null))
                }
            }).catch(err => {
                res.status(500).json(messageBuilder(
                    MSG_ERROR,
                    err.message || "Cannot delete a user!",
                    null
                ));
            })
        } else {
            res.json(messageBuilder(
                MSG_FAILED,
                'User does not exist!',
                null))
        }
    }).catch(err => {
        res.status(500).json(messageBuilder(
            MSG_ERROR,
            err.message || "Cannot delete a user!",
            null
        ));
    })
}

exports.update = async (req, res) => {
    const t = await sequelize.transaction();

    await Users.findOne({
        where: {
            id: req.body.id
        },
        include: [{
            model: Accounts,
            as: 'accountUsers',
            attributes: ['username']
        }]
    }).then(async (users) => {
        if (users) {
            var accounts = await Accounts.findAll({
                where: {
                    username: req.body.username
                }
            }).catch(err => {
                t.rollback()
                res.status(500).json(messageBuilder(
                    MSG_ERROR,
                    err.message || "Cannot update a user!",
                    null
                ));
            })

            if (accounts.length > 0 && users.accountUsers.dataValues.username !== req.body.username) {
                res.json(messageBuilder(
                    MSG_FAILED,
                    'Username already exists!',
                    null))
            } else {
                await Users.update({
                    firstName: req.body.firstName ? req.body.firstName : users._previousDataValues.firstName,
                    middleName: req.body.middleName ? req.body.middleName : users._previousDataValues.middleName,
                    lastName: req.body.lastName ? req.body.lastName : users._previousDataValues.lastName,
                    branchId: req.body.branchId ? req.body.branchId : users._previousDataValues.branchId,
                    salary: req.body.salary ? req.body.salary : users._previousDataValues.salary
                }, {
                    where: { id: req.body.id }
                }, { transaction: t })

                var accountDetails = {}

                if (req.body.password) {
                    var accountInstance = await Accounts.build({ username: "test" })
                    let password = await accountInstance.generateHash(req.body.password)
                    await accountInstance.destroy()

                    accountDetails['password'] = password
                }

                if (req.body.username) {
                    accountDetails['username'] = req.body.username
                }

                await Accounts.update(
                    accountDetails,
                    { where: { userId: req.body.id } }, { transaction: t })

                await t.commit()

                res.status(200).json(messageBuilder(
                    MSG_SUCCESS,
                    'Successfully updated a user!',
                    null
                ))
            }
        } else {
            res.status(200).json(messageBuilder(
                MSG_FAILED,
                'User does not exist!',
                null
            ))
        }
    }).catch(err => {
        t.rollback()
        res.status(500).json(messageBuilder(
            MSG_ERROR,
            err.message || "Cannot update a user!",
            null
        ));
    })
}

exports.findAll = async (req, res) => {
    await Users.findAll({
        include: [{
            model: Accounts,
            as: 'accountUsers',
            attributes: ['username']
        }, {
            model: Branches,
            as: 'userBranches',
            attributes: ['name']
        }],
        where: { id: { [Op.not]: 1 } },
        attributes: ['id', 'firstName', 'middleName', 'lastName', 'salary']
    }).then(users => {
        res.json(messageBuilder(MSG_SUCCESS, null, users))
    }).catch(err => {
        res.status(500).json(messageBuilder(
            MSG_ERROR,
            err.message || "Cannot fetch users!",
            null
        ));
    })
}

exports.findById = async (req, res) => {
    await Users.findOne({
        where: {
            id: req.params.id
        },
        include: [{
            model: Accounts,
            as: 'accountUsers',
            attributes: ['username']
        }, {
            model: Branches,
            as: 'userBranches',
            attributes: ['name']
        }],
        attributes: ['id', 'firstName', 'middleName', 'lastName', 'salary', 'branchId']
    }).then(user => {
        res.json(messageBuilder(MSG_SUCCESS, null, user))
    }).catch(err => {
        res.status(500).json(messageBuilder(
            MSG_ERROR,
            err.message || "Cannot fetch users!",
            null
        ));
    })
}

exports.search = async (req, res) => {
    await Users.findAll({
        where: {
            ...userSearchQueryBuilder(req)
        }, include: [{
            model: Branches,
            as: 'userBranches',
            attributes: ['name'],
        }, {
            model: Accounts,
            as: 'accountUsers',
            attributes: ['username']
        }],
        attributes: ['id', 'firstName', 'middleName', 'lastName', 'branchId', 'salary']
    }).then(users => {
        if (users) {
            res.json(messageBuilder(MSG_SUCCESS, null, users))
        } else {
            res.json(messageBuilder(
                MSG_SUCCESS,
                null,
                null))
        }
    }).catch(err => {
        res.status(500).json(messageBuilder(
            MSG_ERROR,
            err.message || "Cannot get users!",
            null
        ));
    })
}
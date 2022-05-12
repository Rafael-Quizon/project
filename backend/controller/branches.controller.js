const models = require('../models')
const Branches = models.branches

const { messageBuilder, MSG_SUCCESS, MSG_ERROR, MSG_FAILED } = require('../helpers/messageHandler')

exports.findAll = async (req, res) => {
    await Branches.findAll({
        attributes: ['id', 'name']
    }).then(branches => {
        res.json(messageBuilder(MSG_SUCCESS, null, branches))
    }).catch(err => {
        res.status(500).json(messageBuilder)
    })
}
const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../controller/accounts.controller')

const router = express.Router()

router.use(bodyParser.json())

router.post('/create', controller.create)
router.delete('/:id', controller.delete)
router.post('/update', controller.update)
router.post('/login', controller.login)
router.get('/:id', controller.findById)
router.get('/', controller.findAll)
router.post('/search', controller.search)

module.exports = router
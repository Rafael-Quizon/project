const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../controller/branches.controller')

const router = express.Router()

router.use(bodyParser.json())

router.get('/', controller.findAll)

module.exports = router
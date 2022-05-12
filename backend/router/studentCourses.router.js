const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../controller/studentcourses.controller')

const router = express.Router()

router.use(bodyParser.json())

router.post('/create', controller.create)
router.delete('/:id', controller.deleteById)
router.post('/update', controller.update)
router.get('/', controller.findAll)

module.exports = router
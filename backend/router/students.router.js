const express = require('express');
const bodyParser = require('body-parser');
const controller = require('../controller/students.controller')

const router = express.Router()

router.use(bodyParser.json())

router.post('/create', controller.create)
router.delete('/:id', controller.deleteById)
router.post('/update', controller.update)
router.get('/studentsByBranch/:id', controller.findByBranchId)
router.get('/:id', controller.findById)
router.get('/', controller.findAll)
router.post('/search', controller.search)
router.get('/statistics/count', controller.countStatistics)

module.exports = router
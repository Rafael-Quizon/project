const express = require('express')
const bodyParser = require('body-parser')
const loginController = require('./login.controller')

const router = express.Router()
router.use(bodyParser.json())

router.get('/', (req, res, next) => {
    return loginController.loginValidate()
        .then((data) => {
            res.status(200).send(buildSuccessResponse(data))
        })
        .catch((err) => {
            next(err);
        });
})        

const buildSuccessResponse = (data) => {
    return {
        message : 'success',
        data : data
    };
};

module.exports = router
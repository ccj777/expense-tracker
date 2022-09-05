const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const expenses = require('./modules/expenses')
const users = require('./modules/users')
//middleware
const { authenticator } = require('../middleware/auth')

router.use('/users', users)
router.use('/', authenticator, home)
router.use('/expenses', authenticator,  expenses)

module.exports = router
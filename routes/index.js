const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const expenses = require('./modules/expenses')
const users = require('./modules/users')
// const auth = require('./modules/auth')

// //middleware
// const { authenticator } = require('../middleware/auth')

// router.use('/restaurants', authenticator, restaurants)
// router.use('/users', users)
// router.use('/auth', auth)
router.use('/', home)

module.exports = router
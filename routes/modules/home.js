const express = require('express')
const router = express.Router()
const Expenses = require('../../models/expense')

router.get('/', (req, res) => {
  // const userId = req.user._id
  //{ userId }
  Expenses.find()
    .lean()
    .sort({ name: 'asc' }) // 正序asc，反序desc
    .then(expenses => {
      res.render('index', { expenses })
    })
    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router
const express = require('express')
const router = express.Router()
const Expenses = require('../../models/expense')


// 導向首頁
router.get('/', (req, res) => {
  const userId = req.user._id
  Expenses.find({ userId })
    .lean()
    .sort({ name: 'asc' }) // 正序asc，反序desc
    .then(expenses => {
      let totalAmount = 0
      for (let i = 0; i < expenses.length; i++) {
        totalAmount += expenses[i].amount
      }
      res.render('index', { expenses, totalAmount })
    })

})

// POST select表單
router.post('/category', (req, res) => {
  const userId = req.user._id
  const categoryId = req.body.category
  Expenses.find({ categoryId, userId})
    .lean()
    .then(expenses => {
      let totalAmount = 0
      for (let i = 0; i < expenses.length; i++) {
        totalAmount += expenses[i].amount
      }
      res.render('index', { expenses, totalAmount })
    }).catch(error => console.error(error))

})

// 匯出路由模組
module.exports = router
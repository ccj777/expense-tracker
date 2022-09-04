// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 expense model
const Expense = require('../../models/expense')

// 定義路由
router.get('/new', (req, res) => {
  return res.render('new')
})

// 首頁
router.post('/', (req, res) => {
  // req.body.userId = req.user._id
  return Expense.create(req.body) // name存入資料庫,簡化 name:name -> name
    .then(() => res.redirect('/')) // 導回首頁
    .catch(error => console.log(error))
})


// 根據不同id建立路由， edit
router.get('/:id/edit', (req, res) => {
  // const userId = req.user._id
  const _id = req.params.id
  return Expense.findOne({ _id })
    .lean()
    .then(expense => {
      res.render('edit', { expense })
    })
    .catch(error => console.log(error))
})

//put 的路由
router.put('/:id', (req, res) => {
  // const userId = req.user._id
  const _id = req.params.id
  const keys = Object.keys(req.body)
  return Expense.findOne({ _id })//, userId
    .then(expenseData => {
      for (let key of keys) {
        expenseData[key] = req.body[key]
      }
      return expenseData.save()
        .then(() => res.redirect(`/`))
        .catch(error => console.log(error))
    })
})

// 匯出路由模組
  module.exports = router
//delete 的路由
// router.delete('/:id', (req, res) => {
//   const userId = req.user._id
//   const _id = req.params.id
//   return Expense.findOne({ _id, userId })
//     .then(expense => expense.remove())
//     .then(() => res.redirect('/'))
//     .catch(error => console.log(error))
// })




const express = require('express')
const router = express.Router()

// 導向login頁面
router.get('/login', (req, res) => {
  res.render('login')
})

// 導向register頁面
router.get('/register',(req, res) => {
  res.render('register')
})

// register 表單送出
router.post('/register',(req, res) => {

})


module.exports = router
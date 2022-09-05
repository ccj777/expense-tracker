const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const passport = require('passport')

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
  // 取得表單參數
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if ((!email) || (!password) || (!confirmPassword)) {
    errors.push({ message: '除姓名欄位，所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        // 如果已有使用者，退回註冊畫面
        errors.push({ message: '這個 Email 已經註冊過了。' })
        return res.render('register', {
          errors,
          name,
          email,
          password,
          confirmPassword
        })
      }
      // 如果沒有，寫入資料
      return bcrypt
        .genSalt(10) // 產生「鹽」，並設定複雜度係數為 10
        .then(salt => bcrypt.hash(password, salt)) // 為使用者密碼「加鹽」，產生雜湊值
        .then(hash => User.create({
          name,
          email,
          password: hash
        })
          .then(() => res.redirect('/'))
          .catch(error => console.log(error)))
    })
})

// 登入
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

module.exports = router
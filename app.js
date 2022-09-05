const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
require('./config/mongoose')

// 如果在 Heroku 環境則使用 process.env.PORT
// 否則為本地環境，使用 3000 
const port = process.env.PORT || 3000

const app = express()


// set view engine
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    // Date 只留年月日
    dateFormat(date) {
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    },
    ifEqual(a, b, options) {
      return a === b ? options.fn(this) : options.inverse(this)
    },
    // 根據categoryId回傳對應icon
    icon(categoryId) {
      switch (categoryId) {
        case 1:
          return 'fa-house'
        case 2:
          return 'fa-van-shuttle'
        case 3:
          return 'fa-face-grin-beam'
        case 4:
          return 'fa-utensils'
        case 5:
          return 'fa-pen'
      }
    }
  }
}))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(routes)

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
const Expense = require('./../expense')
const User = require('./../user')
const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')

const SEED_USER = {
  name: 'user',
  email: 'user@example.com',
  password: '12345678',
}

const SEED_EXPENSES = [
  {
    name: '午餐',
    date: '2022-4-23',
    amount: 60,
    categoryId: 4
  },
  {
    name: '晚餐',
    date: '2022-4-23',
    amount: 60,
    categoryId: 4
  },
  {
    name: '捷運',
    date: '2022-4-24',
    amount: 120,
    categoryId: 2
  },
  {
    name: '租金',
    date: '2022-4-1',
    amount: 25000,
    categoryId: 1
  },
  {
    name: '電影:驚奇隊長',
    date: '2022-4-23',
    amount: 60,
    categoryId: 3
  }]

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('recordSeeder is running')
  return bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => User.create({ ...SEED_USER, password: hash }))
    .then(user => {
      Promise.all(SEED_EXPENSES.map(expense => {
        console.log(`${expense.name} has been created.`)
        return Expense.create({ ...expense, userId: user._id })
      })).then(() => {
        console.log('recordSeeder is done.')
        process.exit()
      })
    })
})


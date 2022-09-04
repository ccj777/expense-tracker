const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expensesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Categories',
    index: 'true',
    required: false
  },
  amount: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: false
  }
})

module.exports = mongoose.model('Expenses', expensesSchema)
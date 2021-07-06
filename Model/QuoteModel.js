const mongoose = require('mongoose')

const qouteSchema = new mongoose.Schema({
  text: String,
  author: String,
  date: Date,
  users: [String],
})

const quoteModel = mongoose.model('quotes', qouteSchema)

module.exports = quoteModel

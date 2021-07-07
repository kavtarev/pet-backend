const quoteModel = require('../Model/QuoteModel')
const jsonWebToken = require('jsonwebtoken')

class quotesControllers {
  async getAllQuotes(req, res) {
    const quotes = await quoteModel.find({})
    if (!res.locals.user) {
      res.locals.user = {}
    }
    const id = res.locals.user.id
    res.render('quotes/quotes', { quotes, id })
  }
  async getMyQoutes(req, res) {
    const id = res.locals.user.id
    const quotes = await quoteModel.find({ users: id })

    res.render('quotes/myQuotes', { quotes, id })
  }
  getRandomQoute(req, res) {
    res.send('random')
  }
  async postNewQuote(req, res) {
    const { author, text } = req.body
    const user = res.locals.user // personalize
    const quote = await quoteModel.create({
      author,
      text,
      date: new Date(),
      users: [user.id],
    })
    quote.users.push('gugan')
    let update = await quote.save()
    res.json(update)
  }
  async addQuote(req, res) {
    try {
      const quote = await quoteModel.findById(req.params.id)
      const user = res.locals.user

      quote.users.push(user.id)
      let update = await quote.save()
      res.send('ok')
    } catch (e) {
      console.log(e)
    }
  }
  async deleteQuote(req, res) {
    try {
      const quote = await quoteModel.findById(req.params.id)
      const user = res.locals.user

      quote.users.pull(user.id)
      let update = await quote.save()
      res.send('ok')
    } catch (e) {
      console.log(e)
    }
  }
}
module.exports = new quotesControllers()

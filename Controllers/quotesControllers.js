class quotesControllers {
  getAllQuotes(req, res) {
    res.render('quotes/quotes')
  }
  getMyQoutes(req, res) {
    res.send('my quote')
  }
  getRandomQoute(req, res) {
    res.send('random')
  }
  postNewQuote(req, res) {
    res.send('post new')
  }
}
module.exports = new quotesControllers()

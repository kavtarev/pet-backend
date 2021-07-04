const { Router } = require('express')
const router = Router()
const Quotes = require('../Controllers/quotesControllers')

router.get('/', Quotes.getAllQuotes)
router.post('/addQuote', Quotes.postNewQuote)
router.get('/random', Quotes.getRandomQoute)
//router.get('/', Quotes.getMyQoutes)

module.exports = router

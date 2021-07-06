const { Router } = require('express')
const router = Router()
const Quotes = require('../Controllers/quotesControllers')

router.get('/', Quotes.getAllQuotes)
router.post('/addQuote', Quotes.postNewQuote)
router.get('/random', Quotes.getRandomQoute)
router.get('/myQuotes', Quotes.getMyQoutes)
router.put('/:id', Quotes.addQuote)
router.delete('/:id', Quotes.deleteQuote)

module.exports = router

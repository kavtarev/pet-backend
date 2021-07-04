require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./router/authRoutes')
const quotesRouter = require('./router/quotesRouter')
const cookieParser = require('cookie-parser')
const { restricted } = require('./middlewares/restricted')
const { personalize } = require('./middlewares/personalize')

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.set('view engine', 'ejs')
app.set('views', 'views')

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    app.listen(PORT, () => {
      console.log('server is upp ')
    })
  })
  .catch((err) => console.log(err))
app.get('*', personalize)
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/chat', restricted, (req, res) => {
  res.render('chat')
})
app.use('/quotes', quotesRouter)
app.use(authRouter)
app.use(function (req, res, next) {
  res.status(404).render('error')
})

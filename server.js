require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./router/authRoutes')
const quotesRouter = require('./router/quotesRouter')
const cookieParser = require('cookie-parser')
const { restricted } = require('./middlewares/restricted')
const { personalize } = require('./middlewares/personalize')
const path = require('path')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const ioFunction = require('./io/io')

const PORT = process.env.PORT || 3000

app.use(express.static('public'))
app.use('/quotes', express.static(__dirname + '/public'))
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
    server.listen(PORT, () => {
      console.log('server is upp and socket')
    })
  })
  .catch((err) => console.log(err))

app.use('*', personalize)
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
io.on('connection', ioFunction)

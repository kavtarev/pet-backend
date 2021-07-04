const Model = require('../Model/UserModel')
const JWT = require('jsonwebtoken')

// handle errors

function handleError(err) {
  let customError = { name: '', password: '', email: '' }
  if (err.code === 11000) {
    customError.email = 'email already taken'
  }
  if (err.message.includes('JWTuser validation failed')) {
    Object.values(err.errors).forEach((element) => {
      customError[element.properties.path] = element.properties.message
    })
  }
  if (err.message === 'no such user') {
    customError.email = 'no such user'
  }
  if (err.message === 'min length is 3') {
    customError.name = 'min length is 3'
  }
  if (err.message === 'password is incorrect') {
    customError.password = 'password is incorrect'
  }

  return customError
}

// web token

createToken = (id) => {
  return JWT.sign({ id }, process.env.SECRET, { expiresIn: 24 * 3600 })
}

// controllers

class Auth {
  getLogin(req, res) {
    res.render('login')
  }
  async postLogin(req, res) {
    const { name, password, email } = req.body
    try {
      const user = await Model.login(email, password)
      let token = createToken(user._id)
      res.cookie('JWT', token, { httpOnly: true, maxAge: 24 * 3600 * 1000 })
      res.status(200).send(user) //????
    } catch (err) {
      res.status(201).json(handleError(err))
    }
  }
  getRegister(req, res) {
    res.render('register')
  }
  getLogout(req, res) {
    res.cookie('JWT', '', { httpOnly: true, maxAge: 1 })
    res.redirect('/login')
  }
  async postRegister(req, res) {
    //const { name, password,email } = req.body
    try {
      const user = await Model.create(req.body)
      let token = createToken(user._id)
      res.cookie('JWT', token, { httpOnly: true, maxAge: 24 * 3600 * 1000 })
      res.status(200).send(user) //?????
    } catch (err) {
      res.status(201).json(handleError(err))
    }
  }
}

module.exports = new Auth()

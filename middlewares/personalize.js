const jsonwebtoken = require('jsonwebtoken')
const User = require('../Model/UserModel')

const personalize = (req, res, next) => {
  let token = req.cookies.JWT
  if (token) {
    jsonwebtoken.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) {
        console.log(err)
        res.locals.user = {}
        next()
      } else {
        let user = await User.findById(decoded.id)
        res.locals.user = user
        next()
      }
    })
  } else {
    res.locals.user = {}
    next()
  }
}

module.exports = { personalize }

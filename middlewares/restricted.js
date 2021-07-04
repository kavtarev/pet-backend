const jsonwebtoken = require('jsonwebtoken')
const restricted = (req, res, next) => {
  let token = req.cookies.JWT
  if (token) {
    jsonwebtoken.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        console.log(err)
        res.redirect('/login')
      } else {
        next()
      }
    })
  } else {
    res.redirect('/login')
  }
}

module.exports = { restricted }

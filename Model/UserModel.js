const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true,
    lowercase: true,
    validate: [
      (val) => {
        return val.length >= 3
      },
      'min length is 3',
    ],
  },
  password: {
    type: String,
    required: [true, 'name is required'],
    minLength: [6, 'password minimum length is 6'],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [isEmail, 'this should be an email'],
  },
})
UserSchema.pre('save', async function (next) {
  let salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.static('login', async function (email, password) {
  let user = await this.findOne({ email })
  if (user) {
    let result = await bcrypt.compare(password, user.password)
    if (result) {
      return user
    }
    throw Error('password is incorrect')
  }
  throw Error('no such user')
})
const model = mongoose.model('JWTuser', UserSchema)

module.exports = model

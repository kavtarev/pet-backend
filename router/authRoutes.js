const { Router } = require('express')
const router = Router()
const Auth = require('../Controllers/authControllers')

router.get('/login', Auth.getLogin)
router.post('/login', Auth.postLogin)
router.get('/register', Auth.getRegister)
router.post('/register', Auth.postRegister)
router.get('/logout', Auth.getLogout)

module.exports = router

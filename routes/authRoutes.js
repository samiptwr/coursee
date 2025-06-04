const express= require('express')
const router = express.Router()

//controllers
const {signupAuth, loginAuth} = require('../controllers/authController')

//signup
router.get('/signup', (req, res) => {
  res.render('signup')
})
.post('/signup', signupAuth)

//login
router.get('/login', (req, res) => {
  res.render('login')
})
.post('/login', loginAuth)



module.exports = router
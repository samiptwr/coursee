const jwt = require('jsonwebtoken')
const SECRET = 'donottellanyone'

const checkUser = (req, res, next) => {
  const token = req.cookies.token

  if(!token){
    res.locals.user = null
    return next()
  }

  jwt.verify(token, SECRET, (err, user) => {
    if(err) return res.locals.user = null

    res.locals.user = user
  })

  next()
}

module.exports = checkUser
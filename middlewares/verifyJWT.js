
const jwt = require('jsonwebtoken')
const SECRET = 'donottellanyone'

const verifyToken = (req, res, next) => {
  const token = req.cookies.token
  
  if(!token){
    req.user = null
    return res.redirect('/login')
  }

  jwt.verify(token, SECRET, (err, user) => {
    if(err) {
      req.user = null
      return res.redirect('/login')
    } 
    req.user = user
    next()
  })
}

const verifyRoles = (role = []) => {
  return (req, res, next)=>{
    if(!role.includes(req.user.role)){
      return res.redirect('/')
    }
    next()
  }
}

module.exports = {verifyToken, verifyRoles}
const bcrypt = require('bcrypt')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const SECRET = 'donottellanyone'

const signupAuth = async (req, res) => {
  const {name, email, password, role} = req.body

  const isEmail = await User.findOne({email: email})

  if(isEmail){
    req.session.message = {message: 'User already exists!', type: 'danger'}
    return res.redirect('/signup')
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const userDB = await User.create({name, email, hashedPassword, role})

  if(!userDB){
    req.session.message = {message: 'Something went wrong!', type: 'danger'}
    return res.redirect('/signup')
  }
  req.session.message = {message: 'User created successfully!', type: 'success'}
  res.redirect('/login')
}

const loginAuth = async (req, res) =>{
  const {email, password} = req.body
  const isEmail = await User.findOne({email : email})

  if(!isEmail){
    req.session.message = {message: 'User doesn\'t exists!!', type: 'danger'}
    return res.redirect('/login')
  }

  //check password
  const matchedPass = bcrypt.compare(password, isEmail.hashedPassword)

  if(!matchedPass){
    req.session.message = {message: 'Incorrect Password', type: 'danger'}
    return res.redirect('/login')
  }
  const token = jwt.sign({id: isEmail._id, role: isEmail.role, name: isEmail.name}, SECRET, {expiresIn: '5d'})
  res.cookie('token', token, {httpOnly: true})
  req.session.message = {message:'Welcome Back!', type:'success'}
  res.redirect('/')
}

module.exports = {signupAuth, loginAuth}
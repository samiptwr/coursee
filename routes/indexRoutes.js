const express = require('express')
const router = express.Router()
const Course = require('../models/courseModel')

router.get('/', async (req, res) => {
  const user = res.locals.user
  if(!user){
    const courses = await Course.find().sort({createdAt: -1}).populate('uploadedUser')
    return res.render('index', {courses})  
  }
  const courses = await Course.find().sort({createdAt: -1}).populate('uploadedUser')
  res.render('index', {courses})
})

module.exports = router
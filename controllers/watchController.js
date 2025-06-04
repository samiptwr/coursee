const Course = require('../models/courseModel')

const showWatch = async (req, res) => {
  const courseId = req.params.id
  const course = await Course.findById(courseId).populate('uploadedUser')
  if(!course){
    req.session.message = {message: 'Course was not found!', type: 'danger'}
    return res.render('/')
  } 
  res.render('courseInterface', {course})
}

module.exports ={showWatch}
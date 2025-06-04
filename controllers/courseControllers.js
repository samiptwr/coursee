const Course = require('../models/courseModel')

const displayCourseDetails = async (req, res) => {
  const courseId = req.params.id 
  const course = await Course.findById(courseId).populate('uploadedUser')

  if(!course){
    req.session.message = {message: 'Course doesn\'t exists!!', type: 'danger'}
    return res.redirect('/')
  }

  res.render('course', {course})
}



module.exports = {displayCourseDetails}
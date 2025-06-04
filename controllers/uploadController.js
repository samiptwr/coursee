
const Course = require('../models/courseModel')
const User = require('../models/userModel')

const courseUpload = async (req, res) =>{
  const {title, genre, pricing, description, aboutWriter} = req.body
  const id = req.params.id

  const video = req.files['uploadVideo']?.[0]
  const thumbnail = req.files['uploadThumbnail']?.[0]
  const courseUploaded = await Course.create({
    pathVideo: `/uploads/${video.filename}`,
    thumbnailPath: `/uploads/${thumbnail.filename}`,
    title: title,
    uploadedUser: id,
    price: pricing, 
    genre: genre,
    description: description,
    aboutWriter: aboutWriter
  })
 
  if(!courseUploaded){
    req.session.message = {message: 'Course not uploaded!', type: 'danger'}
    return res.redirect('/')
  }
  await User.findByIdAndUpdate(id, {$push: {uploadedCourses: courseUploaded._id}})
  await User.findByIdAndUpdate(id, {$inc: {totalCourses: 1}})
  req.session.message = {message:'Course was uploaded!', type: 'success'}
  res.redirect('/')
}

module.exports = {courseUpload}
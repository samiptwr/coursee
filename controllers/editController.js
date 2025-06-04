const Course = require('../models/courseModel')

const showAllDatas = async (req, res) => {
  const courseId = req.params.id
  const courseDetail = await Course.findById(courseId)
  res.render('courseEdit', {courseDetail})
}

const updateDatas = async (req,res) => {
  const courseId = req.params.id
  const {title, genre, pricing, description, aboutWriter} = req.body
  const video = req.files['uploadedFile']?.[0]
  const thumb = req.files['thumbnailImg']?.[0]
  const updated = await Course.findByIdAndUpdate(courseId, {
    title: title, 
    genre: genre,
    price: pricing,
    description: description,
    aboutWriter: aboutWriter,
  })

  if(video){
      await Course.findByIdAndUpdate(courseId, {
      pathVideo: `/uploads/${video.filename}`
    })
  }else{
    req.session.message = {message: 'Video was not updated!', type: 'danger'}
  }
  if(thumb){
      await Course.findByIdAndUpdate(courseId, {
      thumbnailPath : `/uploads/${thumb.filename}`
    })
  }else{
    req.session.message = {message: 'Thumbnail was not updated!', type: 'danger'}
  }

  if(!updated){
    req.session.message = {message: 'Course was not updated!', type: 'danger'}
    return res.redirect('/')
  }
  
  req.session.message = {message: 'Course was updated!', type:'success'}
  res.redirect('/')
}

module.exports = {showAllDatas, updateDatas}
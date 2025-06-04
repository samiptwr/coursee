const Course = require('../models/courseModel')
const User = require('../models/userModel')

const displayPurchaseDetails = async (req, res) => {
  const courseId = req.params.id 
  const course = await Course.findById(courseId).populate('uploadedUser')
  if(!course){
    res.redirect('/')
  }
  res.render('checkout', {course})
}

const purchaseDetails = async (req, res) => {
  const courseId = req.params.courseId
  const userId = req.params.userId

  const user = await User.findById(userId).populate('purchasedCourses')
  const course = await Course.findById(courseId).populate('uploadedUser')

  if(!user && !course){
    req.session.message = {message: 'Something went wrong!', type: 'danger'}
    return res.redirect('/')
  }
  if(user.purchasedCourses.some(id => id.equals(course._id))){
    req.session.message = {message: 'Course is already purchased!', type: 'danger'}
    return res.redirect('/')
  }
  await user.updateOne({$push: {purchasedCourses: course._id}})
  await course.updateOne({$inc: {sales: 1}})
  await User.findByIdAndUpdate(course.uploadedUser._id, {$inc: {totalPurchases: 1}})
  await User.findByIdAndUpdate(course.uploadedUser._id, {$inc: {totalRevenue: 1 * course.price}})
  req.session.message = {message: 'Course successfully purchased!', type:'success'}
  res.redirect(`/dashboard/${user._id}`)
}

module.exports = {displayPurchaseDetails, purchaseDetails}
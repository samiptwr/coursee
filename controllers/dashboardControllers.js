const User = require('../models/userModel')
const Course = require('../models/courseModel')

const showDashboard = async (req, res) => {
  const id = req.params.id

  const userExists = await User.findOne({_id: id}).populate({path: 'purchasedCourses', populate: {path: 'uploadedUser'}}).populate({path: 'uploadedCourses', populate: {path: 'uploadedUser'}})
  if(!userExists){
    req.session.message = {message: 'User doesn\'t exists!', type: 'danger'}
    return res.redirect('/')
  }
  
  if(userExists.role == 'instructor'){
    res.render('InstructerDashboard', {userInfo: userExists})
  } else if (userExists.role == 'student'){
    res.render('userDashboard', {userInfo: userExists})
  }
}

module.exports = {showDashboard}
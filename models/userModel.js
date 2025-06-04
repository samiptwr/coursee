const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
    required: true
  }, 
  role: {
    type: String,
    required: true
  }, purchasedCourses: [{
    type: mongoose.Types.ObjectId,
    ref: 'Course'
  }], uploadedCourses: [{
    type: mongoose.Types.ObjectId,
    ref: 'Course'
  }], totalCourses: {
    type: Number,
    default: 0
  }, totalPurchases: {
    type: Number,
    default: 0
  }, totalRevenue: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('User', userSchema)
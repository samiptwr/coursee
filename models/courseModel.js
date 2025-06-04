const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  pathVideo:{
    type: String,
    required: true
  },
  thumbnailPath: { 
    type: String,
    required: true
  }, title: {
    type: String,
    required: true
  }, uploadedUser: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  }, price: {
    type: Number,
    required: true
  }, genre: {
    type: String,
    required: true
  }, rating: {
    type: Number,
  }, description: {
    type: String,
    required: true
  }, aboutWriter: {
    type: String,
    required: true
  }, ratings: {
    type: mongoose.Types.ObjectId,
    ref:'ratings'
  }, sales: {
    type: Number
  }, createdAt: {
    type: Date,
    default: Date.now
  }
})

courseSchema.index({title: 'text'})

module.exports = mongoose.model('Course', courseSchema)
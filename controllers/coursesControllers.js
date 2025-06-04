
const Course = require('../models/courseModel')

const coursesDisplay = async (req, res) => {
  const courses = await Course.find().sort({createdAt: -1}).populate('uploadedUser')
  res.render('coursLists', {courses})
}

const fetchSearchData = async (req, res) => {
  const query = req.query.q || ''

  const details = await Course.find({
      $text: {$search: query}
  }).populate('uploadedUser')
  res.json(details)
}

module.exports = {coursesDisplay, fetchSearchData}
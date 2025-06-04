const express = require('express')
const router = express.Router()

const {displayCourseDetails} = require('../controllers/courseControllers')

router.get('/:id', displayCourseDetails)

module.exports = router
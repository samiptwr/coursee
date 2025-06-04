const express = require('express')
const router = express.Router()

const {coursesDisplay, fetchSearchData} = require('../controllers/coursesControllers')
 
router.get('/', coursesDisplay)
router.get('/search', fetchSearchData)

module.exports = router
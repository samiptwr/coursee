const express = require('express')
const router = express.Router()
const upload = require('../middlewares/multer')
 
const {courseUpload} =require('../controllers/uploadController')

router.get('/', (req, res) => { 
  res.render('courseUpload')
})

router.post('/:id', upload.fields([
  {name: 'uploadVideo', maxCount: 1}, {name: 'uploadThumbnail', maxCount: 1}
]),courseUpload)


module.exports = router
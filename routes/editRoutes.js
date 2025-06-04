const express = require('express')
const router = express.Router()

const upload = require('../middlewares/multer')

const {showAllDatas, updateDatas} = require('../controllers/editController')

router.get('/:id', showAllDatas)
router.post('/:id', upload.fields([
  {name: 'uploadedFile', maxCount: 1}, {name: 'thumbnailImg', maxCount: 1}
]),updateDatas)

module.exports = router
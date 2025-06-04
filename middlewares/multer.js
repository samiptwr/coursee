
const multer = require('multer')
const path = require('path')

//multer stuffs
const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, path.join(__dirname,'..', 'uploads'))
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-'+file.originalname.replace(/\s+/g, '_'))
  }
})

const upload = multer({storage})

module.exports = upload
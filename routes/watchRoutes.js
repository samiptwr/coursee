const express =require('express')
const router = express.Router()

const {showWatch} = require('../controllers/watchController')

router.get('/:id', showWatch)

module.exports = router
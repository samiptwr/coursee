const express = require('express')
const router = express.Router()

const {showDashboard} = require('../controllers/dashboardControllers')

router.get('/:id', showDashboard)

 
module.exports = router
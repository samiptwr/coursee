const express = require('express')
const router = express.Router()

const {displayPurchaseDetails, purchaseDetails} = require('../controllers/checkoutControllers')

router.get('/buy/:id', displayPurchaseDetails)
router.post('/purchased/:courseId/:userId', purchaseDetails)

module.exports = router
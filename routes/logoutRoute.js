const express = require('express')
const router = express.Router()

router.get('/:id', async (req, res) => {
  const userId = req.params.id

  const user = req.user

  if(userId !== user.id){
    res.redirect('/')
  }
  res.clearCookie('token', { httpOnly: true })
  res.redirect('/')
})

module.exports = router
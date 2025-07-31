const express = require('express')
const router = express.Router()
const ipController = require('../controllers/ipController')

router.get(
    '/verify-ip', 
    ipController.verifyIP
)

module.exports = router

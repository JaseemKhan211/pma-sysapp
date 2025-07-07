const express = require('express');
const totpController = require('../controllers/totpController');

const router = express.Router();

router.route('/')
    .post(totpController.createtotp);

module.exports = router;
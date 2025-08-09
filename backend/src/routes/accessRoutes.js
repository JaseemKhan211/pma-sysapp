const express = require('express');
const { connectToSystem } = require('../controllers/accessController');

const router = express.Router();

router.get('/connect', connectToSystem);

module.exports = router;

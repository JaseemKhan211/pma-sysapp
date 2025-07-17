const express = require('express');
const adController = require('../controllers/adController');

const router = express.Router();

// Get one user by username
router.get('/user/:username', adController.getADUser);

// Get all users
router.get('/users', adController.getAllADUsers);

module.exports = router;
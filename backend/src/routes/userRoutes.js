const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

// Route to handle user login
router.post('/login', authController.login);

// Routes for user management
router.route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route('/:usrid')
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
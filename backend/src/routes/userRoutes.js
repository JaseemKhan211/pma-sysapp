const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router.route('/:usrid')
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
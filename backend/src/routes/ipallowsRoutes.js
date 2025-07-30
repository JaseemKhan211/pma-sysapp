const express = require('express');
const ipallowsController = require('../controllers/ipallowsController');

const router = express.Router();

router.route('/')
  .get(ipallowsController.getAllIPallowed)
  .post(ipallowsController.createIPallowed);

router.route('/:usrid')
  .get(ipallowsController.getIPallowed)
  .put(ipallowsController.updateIPallowed)
  .delete(ipallowsController.deleteIPallowed);

module.exports = router;
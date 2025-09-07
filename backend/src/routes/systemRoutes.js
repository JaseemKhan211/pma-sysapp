const express = require('express');
const systemController = require('../controllers/systemController');

const router = express.Router();

// Routes for system management
router.route('/')
  .get(systemController.getAllSystems)
  .post(systemController.createSystem);

// Routes for specific system identified by systemid
router.route('/:systemid')
  .get(systemController.getSystem)
  .put(systemController.updateSystem)
  .delete(systemController.deleteSystem);

module.exports = router;
 
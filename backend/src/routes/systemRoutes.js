const express = require('express');
const systemController = require('../controllers/systemController');

const router = express.Router();

router.get(
    '/', 
    systemController.listSystems
);

router.get(
    '/:connectionId/access', 
    systemController.accessSystem
);

module.exports = router;

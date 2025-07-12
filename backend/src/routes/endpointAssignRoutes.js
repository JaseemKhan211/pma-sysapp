const express = require('express');
const endpointAssignController = require('../controllers/endpointAssignController');


const router = express.Router();

// MMiddleware to handle file uploads for endpoint assignment photos
router.route('/')
  .post(endpointAssignController.createEndpointAssign)
  .get(endpointAssignController.getAllEndpointAssigns);

module.exports = router;
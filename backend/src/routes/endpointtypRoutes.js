const express = require('express');
const endpointtypController = require('../controllers/endpointtypController');


const router = express.Router();

// MIddleware to handle file uploads for endpoint type photos
router.route('/')
  .post(endpointtypController.createEndpointType)
  .get(endpointtypController.getAllEndpointTypes);

// Routes for individual endpoint type operations
// The ':endpointtypid' parameter will be used to identify the specific endpoint type
router.route('/:endpointtypid')
  .put(endpointtypController.updateEndpointType)
  .delete(endpointtypController.deleteEndpointType)
  .get(endpointtypController.getEndpointType);

module.exports = router;
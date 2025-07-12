const express = require('express');
const endpointController = require('../controllers/endpointController');


const router = express.Router();

// MMiddleware to handle file uploads for endpoints photos
router.route('/')
  .post(endpointController.createEndpoint)
  .get(endpointController.getAllEndpoints);

// Routes for individual endpoint operations
// The ':endpointid' parameter will be used to identify the specific endpoint
router.route('/:endpointid')
  .put(endpointController.updateEndpoint)
  .delete(endpointController.deleteEndpoint)
  .get(endpointController.getEndpoint);

module.exports = router;
const express = require('express');
const endpointosController = require('../controllers/endpointosController');


const router = express.Router();

// MIddleware to handle file uploads for endpoint OS photos
router.route('/')
  .post(endpointosController.createEndpointOs)
  .get(endpointosController.getAllEndpointOs);

// Routes for individual endpoint OS operations
// The ':endpointosid' parameter will be used to identify the specific endpoint OS
router.route('/:endpointosid')
  .put(endpointosController.updateEndpointOs)
  .delete(endpointosController.deleteEndpointOs)
  .get(endpointosController.getEndpointOs);

module.exports = router;
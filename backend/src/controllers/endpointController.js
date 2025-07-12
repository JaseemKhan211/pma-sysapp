const endpointModel = require('../models/endpointModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// CREATE ENDPOINT
exports.createEndpoint = catchAsync(async (req, res, next) => {
  // Validate request body
  const newEndpoint = await endpointModel.createEndpoint(req.body);

  // If the endpoint is created successfully
  res.status(201).json({
      status: 'success',
      message: 'Endpoint created successfully 🎉',
      data: {
        newEndpoint
      }
    });
  });

// UPDATE ENDPOINT
exports.updateEndpoint = catchAsync(async (req, res, next) => {
  // Extract endpoint ID from request parameters
  const { endpointid } = req.params;

  // Ensure the endpoint ID is provided in the request body
  const updatedEndpoint = await endpointModel.updateEndpoint({ ...req.body, endpointid });

  // If no endpoint is found with the provided ID
  if (!updatedEndpoint || updatedEndpoint.length === 0) {
    return next(new AppError('No endpoint found with that ID 😢', 404));
  }

  // Fetch the updated endpoint to return in the response
  const getEndpoint = await endpointModel.getEndpoint(endpointid);

  // If the endpoint is updated successfully
  res.status(200).json({
    status: 'success',
    message: 'Endpoint updated successfully 🎉',
    data: {
      getEndpoint
    }
   });
  });

// DELETE ENDPOINT
exports.deleteEndpoint = catchAsync(async (req, res, next) => {
  // Extract endpoint ID from request parameters
  const { endpointid } = req.params;
  await endpointModel.deleteEndpoint(endpointid);

  // If no endpoint is found with the provided ID
  if (!endpointid) {
    return next(new AppError('Endpoint not found 😢', 404));
  }

  // If the endpoint is deleted successfully
  res.status(200).json({
      status: 'success',
      message: 'Endpoint deleted successfully 🎉'
    });
  });

// GET ENDPOINTS
exports.getEndpoint = catchAsync(async (req, res, next) => {
  // Extract endpoint ID from request parameters
  const { endpointid } = req.params;
  const endpoint = await endpointModel.getEndpoint(endpointid);

  // If no endpoint is found with the provided ID
  if (!endpoint) {
    return next(new AppError('No endpoint found with that ID 😢', 404));
  }

  // If the endpoint is found successfully
  res.status(200).json({
    status: 'success',
    message: 'Endpoint fetched successfully 🎉',
    data: {
      endpoint
    }
   });
  });

// GET ALL ENDPOINTS
exports.getAllEndpoints = catchAsync(async (req, res, next) => {
  // Fetch all endpoints from the database
  const endpoints = await endpointModel.getAllEndpoints();

  // If no endpoints are found
  if (!endpoints || endpoints.length === 0) {
    return next(new AppError('No endpoints found 😢', 404));
  }

  // If the endpoints are fetched successfully
  res.status(200).json({
    status: 'success',
    length: endpoints.length,
    message: 'Endpoints fetched successfully 🎉',
    data: {
      endpoints
    }
   });
  });



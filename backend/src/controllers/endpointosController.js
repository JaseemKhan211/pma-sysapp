const endpointosModel = require('../models/endpointosModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// CREATE ENDPOINTOS
exports.createEndpointOs = catchAsync(async (req, res, next) => {
  // Validate request body
  const newEndpointOs = await endpointosModel.createEndpointOs(req.body);

  // If the endpoint OS is created successfully
  res.status(201).json({
      status: 'success',
      message: 'Endpoint OS created successfully 🎉',
      data: {
        newEndpointOs
      }
    });
  });

// UPDATE ENDPOINTOS
exports.updateEndpointOs = catchAsync(async (req, res, next) => {
  // Extract endpoint OS ID from request parameters
  const { endpointosid } = req.params;

  // Ensure the endpoint OS ID is provided in the request body
  const updatedEndpointOs = await endpointosModel.updateEndpointOs({ ...req.body, endpointosid });

  // If no endpoint OS is found with the provided ID
  if (!updatedEndpointOs || updatedEndpointOs.length === 0) {
    return next(new AppError('No endpoint OS found with that ID 😢', 404));
  }

  // Fetch the updated endpoint OS to return in the response
  const getEndpointOs = await endpointosModel.getEndpointOs(endpointosid);

  // If the endpoint OS is updated successfully
  res.status(200).json({
    status: 'success',
    message: 'Endpoint OS updated successfully 🎉',
    data: {
      getEndpointOs
    }
   });
  });

// DELETE ENDPOINTOS
exports.deleteEndpointOs = catchAsync(async (req, res, next) => {
  // Extract endpoint OS ID from request parameters
  const { endpointosid } = req.params;
  await endpointosModel.deleteEndpointOs(endpointosid);

  // If no endpoint OS is found with the provided ID
  if (!endpointosid) {
    return next(new AppError('Endpoint OS not found 😢', 404));
  }

  // If the endpoint OS is deleted successfully
  res.status(200).json({
      status: 'success',
      message: 'Endpoint OS deleted successfully 🎉'
    });
  });

// GET ENDPOINTOS
exports.getEndpointOs = catchAsync(async (req, res, next) => {
  // Extract endpoint OS ID from request parameters
  const { endpointosid } = req.params;
  const endpointOs = await endpointosModel.getEndpointOs(endpointosid);

  // If no endpoint OS is found with the provided ID
  if (!endpointOs || endpointOs.length === 0) {
    return next(new AppError('No endpoint OS found with that ID 😢', 404));
  }

  // If the endpoint OS is found successfully
  res.status(200).json({
    status: 'success',
    message: 'Endpoint OS fetched successfully 🎉',
    data: {
      endpointOs
    }
   });
  });

// GET ALL ENDPOINTOS
exports.getAllEndpointOs = catchAsync(async (req, res, next) => {
  // Fetch all endpoint OS from the database
  const endpointOs = await endpointosModel.getAllEndpointOs();

  // If no endpoint OS are found
  if (!endpointOs || endpointOs.length === 0) {
    return next(new AppError('No endpoint OS found 😢', 404));
  }

  // If the endpoint OS are fetched successfully
  res.status(200).json({
    status: 'success',
    length: endpointOs.length,
    message: 'Endpoint OS fetched successfully 🎉',
    data: {
      endpointOs
    }
   });
  });



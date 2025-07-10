const endpointtypModel = require('../models/endpointtypModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// CREATE ENDPOINTTYP
exports.createEndpointType = catchAsync(async (req, res, next) => {
  // Validate request body
  const newEndpointType = await endpointtypModel.createEndpointType(req.body);

  // If the endpoint type is created successfully
  res.status(201).json({
      status: 'success',
      message: 'Endpoint type created successfully 🎉',
      data: {
        newEndpointType
      }
    });
  });

// UPDATE ENDPOINTTYP
exports.updateEndpointType = catchAsync(async (req, res, next) => {
  // Extract endpoint type ID from request parameters
  const { endpointtypid } = req.params;

  // Ensure the endpoint type ID is provided in the request body
  const updatedEndpointType = await endpointtypModel.updateEndpointType({ ...req.body, endpointtypid });

  // If no endpoint type is found with the provided ID
  if (!updatedEndpointType || updatedEndpointType.length === 0) {
    return next(new AppError('No endpoint type found with that ID 😢', 404));
  }

  // Fetch the updated endpoint type to return in the response
  const getEndpointType = await endpointtypModel.getEndpointType(endpointtypid);

  // If the endpoint type is updated successfully
  res.status(200).json({
    status: 'success',
    message: 'Endpoint type updated successfully 🎉',
    data: {
      getEndpointType
    }
   });
  });

// DELETE ENDPOINTTYP
exports.deleteEndpointType = catchAsync(async (req, res, next) => {
  // Extract endpoint type ID from request parameters
  const { endpointtypid } = req.params;
  await endpointtypModel.deleteEndpointType(endpointtypid);

  // If no endpoint type is found with the provided ID
  if (!endpointtypid) {
    return next(new AppError('Endpoint type not found 😢', 404));
  }

  // If the endpoint type is deleted successfully
  res.status(200).json({
      status: 'success',
      message: 'Endpoint type deleted successfully 🎉'
    });
  });

// GET ENDPOINTTYP
exports.getEndpointType = catchAsync(async (req, res, next) => {
  // Extract endpoint type ID from request parameters
  const { endpointtypid } = req.params;
  const endpointType = await endpointtypModel.getEndpointType(endpointtypid);

  // If no endpoint type is found with the provided ID
  if (!endpointType || endpointType.length === 0) {
    return next(new AppError('No endpoint type found with that ID 😢', 404));
  }

  // If the endpoint type is found successfully
  res.status(200).json({
    status: 'success',
    message: 'Endpoint type fetched successfully 🎉',
    data: {
      endpointType
    }
   });
  });

// GET ALL ENDPOINTTYP
exports.getAllEndpointTypes = catchAsync(async (req, res, next) => {
  // Fetch all endpoint types from the database
  const endpointTypes = await endpointtypModel.getAllEndpointTypes();

  // If no endpoint types are found
  if (!endpointTypes || endpointTypes.length === 0) {
    return next(new AppError('No endpoint types found 😢', 404));
  }

  // If the endpoint types are fetched successfully
  res.status(200).json({
    status: 'success',
    length: endpointTypes.length,
    message: 'Endpoint types fetched successfully 🎉',
    data: {
      endpointTypes
    }
   });
  });




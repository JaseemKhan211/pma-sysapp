const endpointAssignModel = require('../models/endpointAssignModel');
const catchAsync = require('../utils/catchAsync');

// CREATE ENDPOINT ASSIGNMENT
exports.createEndpointAssign = catchAsync(async (req, res, next) => {
  // Validate request body
  const newEndpointAssign = await endpointAssignModel.createEndpointAssign(req.body);

  // If the endpoint assignment is created successfully
  res.status(201).json({
      status: 'success',
      message: 'Endpoint assignment created successfully 🎉',
      data: {
        newEndpointAssign
      }
    });
  });

// GET ALL ENDPOINT ASSIGNMENTS
exports.getAllEndpointAssigns = catchAsync(async (req, res, next) => {
  // Fetch all endpoint assignments from the database
  const endpointAssigns = await endpointAssignModel.getAllEndpointAssigns();

  // If no endpoint assignments are found
  if (!endpointAssigns || endpointAssigns.length === 0) {
    return next(new AppError('No endpoint assignments found 😢', 404));
  }

  // If the endpoint assignments are fetched successfully
  res.status(200).json({
    status: 'success',
    length: endpointAssigns.length,
    message: 'Endpoint assignments fetched successfully 🎉',
    data: {
      endpointAssigns
    }
   });
  });
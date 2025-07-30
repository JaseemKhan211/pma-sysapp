const ipallowsModel = require('../models/ipallowsModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// CREATE IPALLOWS
exports.createIPallowed = catchAsync(async (req, res, next) => {
  // Validate request body
  const newIPallowed = await ipallowsModel.createIPallowed(req.body);

  // If the ip allowed is created successfully
  res.status(201).json({
      status: 'success',
      message: 'IP allowed created successfully 🎉',
      data: {
        newIPallowed
      }
    });
  });

// UPDATE IPALLOWS
exports.updateIPallowed = catchAsync(async (req, res, next) => {
  // Extract user ID from request parameters
  // Note: The user ID should be passed in the request body or as a URL parameter
  const { usrid } = req.params;

  // Ensure the user ID is provided in the request body
  const updatedIPallowed = await ipallowsModel.updateIPallowed({ ...req.body, usrid });

  // If no IP allowed is found with the provided ID
  if (!updatedIPallowed || updatedIPallowed.length === 0) {
    return next(new AppError('No IP allowed found with that ID', 404));
  }

  // Fetch the updated IP allowed to return in the response
  const getIPallowed = await ipallowsModel.getIPallowed(usrid);

  // If the IP allowed is updated successfully
  res.status(200).json({
    status: 'success',
    message: 'IP allowed updated successfully 🎉',
    data: {
      getIPallowed
    }
  });
});

// DELETE IPALLOWS
exports.deleteIPallowed = catchAsync(async (req, res, next) => {
  // Extract user ID from request parameters
  const { usrid } = req.params;
  await ipallowsModel.deleteIPallowed(usrid);

  // If no IP allowed is found with the provided ID
  if (!usrid) {
    return next(new AppError('IP allowed not found 😢', 404));
  }

  // If the IP allowed is deleted successfully
  res.status(200).json({
    status: 'success',
    message: 'IP allowed deleted successfully 🎉',
  });
});

// GET IPALLOWS
exports.getIPallowed = catchAsync(async (req, res, next) => {
  // Extract user ID from request parameters
  const { usrid } = req.params;
  const ipAllowed = await ipallowsModel.getIPallowed(usrid);

  // If no IP allowed is found with the provided ID
  if (!ipAllowed || ipAllowed.length === 0) {
    return next(new AppError('No IP allowed found with that ID', 404));
  }

  // If the IP allowed is found successfully
  res.status(200).json({
    status: 'success',
    data: {
      ipAllowed
    }
    });
  });

// GET ALL IPALLOWS
exports.getAllIPallowed = catchAsync(async (req, res, next) => {
  // Fetch all IP allowed from the database
  const ipAllowed = await ipallowsModel.getAllIPallowed();

  // If no IP allowed are found
  if (!ipAllowed || ipAllowed.length === 0) {
    return next(new AppError('No IP allowed found', 404));
  }

  // If IP allowed are found, return them
  res.status(200).json({
      status: 'success',
      length: ipAllowed.length,
      message: 'All IP allowed fetched successfully 🎉',
      data: {
        ipAllowed
      }
    });
  });

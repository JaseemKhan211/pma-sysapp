const systemModel = require('../models/systemModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// CREATE SYSTEM
exports.createSystem = catchAsync(async (req, res, next) => {
  // Validate request body
  const newSystem = await systemModel.createSystem(req.body);

  // If the user is created successfully
  res.status(201).json({
      status: 'success',
      message: 'System created successfully 🎉',
      data: {
        newSystem
      }
    });
  });

// UPDATE SYSTEM
exports.updateSystem = catchAsync(async (req, res, next) => {
  // Extract system ID from request parameters
  // Note: The system ID should be passed in the request body or as a URL parameter
  const { systemid } = req.params;

  // Ensure the system ID is provided in the request body
  const updatedSystem = await systemModel.updateSystem({ ...req.body, systemid });

  // If no system is found with the provided ID
  if (!updatedSystem || updatedSystem.length === 0) {
    return next(new AppError('No system found with that ID', 404));
  }

  // Fetch the updated system to return in the response
  const getSystem = await systemModel.getSystem(systemid);

  // If the system is updated successfully
    res.status(200).json({
      status: 'success',
      message: 'System updated successfully 🎉',
      data: {
        getSystem
      }
    });
  });

// DELETE SYSTEM
exports.deleteSystem = catchAsync(async (req, res, next) => {
  // Extract system ID from request parameters
  const { systemid } = req.params;
  await systemModel.deleteSystem(systemid);

  // If no system is found with the provided ID
  if (!systemid) {
    return next(new AppError('System not found 😢', 404));
  }

  // If the system is deleted successfully
  res.status(200).json({
      status: 'success',
      message: 'System deleted successfully 🎉',
    });
  });

// GET SYSTEM
exports.getSystem = catchAsync(async (req, res, next) => {
  // Extract system ID from request parameters
  const { systemid } = req.params;
  const system = await systemModel.getSystem(systemid);

  // If no system is found with the provided ID
  if (!system || system.length === 0) {
    return next(new AppError('No system found with that ID', 404));
  }

  // If the system is found successfully
  res.status(200).json({
    status: 'success',
    data: {
      system
    }
    });
  });

// GET ALL SYSTEMS
exports.getAllSystems = catchAsync(async (req, res, next) => {
  // Fetch all systems from the database
  const systems = await systemModel.getAllSystem();

  // If no systems are found
  if (!systems || systems.length === 0) {
    return next(new AppError('No systems found', 404));
  }

  // If systems are found, return them
  res.status(200).json({
      status: 'success',
      length: systems.length,
      message: 'All systems fetched successfully 🎉',
      data: {
        systems
      }
    });
  });
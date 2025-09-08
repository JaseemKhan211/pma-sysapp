const guacModel = require('../models/guacModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { startConnection } = require('../services/guacamoleService');

// CONNECT SYSTEM USING GUACAMOLE
exports.connectSystem = catchAsync(async (req, res, next) => {
  // Connect to the specified system
  const { systemid } = req.params;
  const system = await guacModel.getSystemForGuac(systemid);

  // 1. Find: If no system is found with the provided ID
  if (!system || system.length === 0) {
    return next(new AppError('No system found with that ID', 404));
  }

  // 2. Start Guacamole connection
  const guacUrl = await startConnection(system);

  // 3. Send URL back to frontend
  res.status(200).json({
    status: "success",
    guacUrl,
  });
  });
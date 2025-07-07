const userModel = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// CREATE
exports.createUser = catchAsync(async (req, res, next) => {
  // Validate request body
  const newUser = await userModel.createUser(req.body);

  // If the user is created successfully
  res.status(201).json({
      status: 'success',
      data: {
        newUser
      }
    });
  });

// UPDATE
exports.updateUser = catchAsync(async (req, res, next) => {
  // Extract user ID from request parameters
  // Note: The user ID should be passed in the request body or as a URL parameter
  const { usrid } = req.params;

  // Ensure the user ID is provided in the request body
  const updatedUser = await userModel.updateUser({ ...req.body, usrid });

  // If no user is found with the provided ID
  if (!updatedUser || updatedUser.length === 0) {
    return next(new AppError('No user found with that ID', 404));
  }

  // Fetch the updated user to return in the response
  const getUser = await userModel.getUser(usrid);

  // If the user is updated successfully
    res.status(200).json({
      status: 'success',
      data: {
        getUser
      }
    });
  });

// DELETE
exports.deleteUser = catchAsync(async (req, res, next) => {
  // Extract user ID from request parameters
  const { usrid } = req.params;
  await userModel.deleteUser(usrid);

  // If no user is found with the provided ID
  if (!usrid) {
    return next(new AppError('User not found 😢', 404));
  }

  // If the user is deleted successfully
  res.status(200).json({
      status: 'success',
      message: 'User deleted successfully 🎉',
    });
  });

// GET
exports.getUser = catchAsync(async (req, res, next) => {
  // Extract user ID from request parameters
  const { usrid } = req.params;
  const user = await userModel.getUser(usrid);

  // If no user is found with the provided ID
  if (!user || user.length === 0) {
    return next(new AppError('No user found with that ID', 404));
  }

  // If the user is found successfully
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
    });
  });

// GET ALL
exports.getAllUsers = catchAsync(async (req, res, next) => {
  // Fetch all users from the database
  const users = await userModel.getAllUser();

  // If no users are found
  if (!users || users.length === 0) {
    return next(new AppError('No users found', 404));
  }

  // If users are found, return them
  res.status(200).json({
      status: 'success',
      length: users.length,
      message: 'All users fetched successfully 🎉',
      data: {
        users
      }
    });
  });

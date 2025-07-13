const uploaderModel = require('../models/uploaderModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// CREATE UPLOADER
exports.createUploader = catchAsync(async (req, res, next) => {
  // Validate request body
  const newUploader = await uploaderModel.createUploader(req.body);

  // If the uploader is created successfully
  res.status(201).json({
      status: 'success',
      message: 'Uploader created successfully 🎉',
      data: {
        newUploader
      }
    });
  });

// UPDATE UPLOADER
exports.updateUploader = catchAsync(async (req, res, next) => {
  // Extract uploader ID from request parameters
  const { uploaderid } = req.params;

  // Ensure the uploader ID is provided in the request body
  const updatedUploader = await uploaderModel.updateUploader({ ...req.body, uploaderid });

  // If no uploader is found with the provided ID
  if (!updatedUploader || updatedUploader.length === 0) {
    return next(new AppError('No uploader found with that ID 😢', 404));
  }

  // Fetch the updated uploader to return in the response
  const getUploader = await uploaderModel.getUploader(uploaderid);

  // If the uploader is updated successfully
  res.status(200).json({
    status: 'success',
    message: 'Uploader updated successfully 🎉',
    data: {
      getUploader
    }
   });
  });

// DELETE UPLOADER
exports.deleteUploader = catchAsync(async (req, res, next) => {
  // Extract uploader ID from request parameters
  const { uploaderid } = req.params;
  await uploaderModel.deleteUploader(uploaderid);

  // If no uploader is found with the provided ID
  if (!uploaderid) {
    return next(new AppError('Uploader not found 😢', 404));
  }

  // If the uploader is deleted successfully
  res.status(200).json({
      status: 'success',
      message: 'Uploader deleted successfully 🎉'
    });
  });

// GET UPLOADER
exports.getUploader = catchAsync(async (req, res, next) => {
  // Extract uploader ID from request parameters
  const { uploaderid } = req.params;
  const uploader = await uploaderModel.getUploader(uploaderid);

  // If no uploader is found with the provided ID
  if (!uploader || uploader.length === 0) {
    return next(new AppError('No uploader found with that ID 😢', 404));
  }

  // If the uploader is found successfully
  res.status(200).json({
    status: 'success',
    message: 'Uploader fetched successfully 🎉',
    data: {
      uploader
    }
   });
  });

// GET ALL UPLOADERS
exports.getAllUploaders = catchAsync(async (req, res, next) => {
  // Fetch all uploaders from the database
  const uploaders = await uploaderModel.getAllUploaders();

  // If no uploaders are found
  if (!uploaders || uploaders.length === 0) {
    return next(new AppError('No uploaders found 😢', 404));
  }

  // If the uploaders are fetched successfully
  res.status(200).json({
    status: 'success',
    length: uploaders.length,
    message: 'Uploaders fetched successfully 🎉',
    data: {
      uploaders
    }
   });
  });



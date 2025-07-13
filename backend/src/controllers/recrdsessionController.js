const recrdsessionModel = require('../models/recrdsessionModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// CREATE RECORD SESSION
exports.createRecordSession = catchAsync(async (req, res, next) => {
  // Validate request body
  const newRecordSession = await recrdsessionModel.createRecordSession(req.body);

  // If the record session is created successfully
  res.status(201).json({
      status: 'success',
      message: 'Record session created successfully 🎉',
      data: {
        newRecordSession
      }
    });
  });

// UPDATE RECORD SESSION
exports.updateRecordSession = catchAsync(async (req, res, next) => {
  // Extract record session ID from request parameters
  const { recrdsessionid } = req.params;

  // Ensure the record session ID is provided in the request body
  const updatedRecordSession = await recrdsessionModel.updateRecordSession({ ...req.body, recrdsessionid });

  // If no record session is found with the provided ID
  if (!updatedRecordSession || updatedRecordSession.length === 0) {
    return next(new AppError('No record session found with that ID 😢', 404));
  }

  // Fetch the updated record session to return in the response
  const getRecordSession = await recrdsessionModel.getRecordSession(recrdsessionid);

  // If the record session is updated successfully
  res.status(200).json({
    status: 'success',
    message: 'Record session updated successfully 🎉',
    data: {
      getRecordSession
    }
   });
  });

// DELETE RECORD SESSION
exports.deleteRecordSession = catchAsync(async (req, res, next) => {
  // Extract record session ID from request parameters
  const { recrdsessionid } = req.params;
  await recrdsessionModel.deleteRecordSession(recrdsessionid);

  // If no record session is found with the provided ID
  if (!recrdsessionid) {
    return next(new AppError('Record session not found 😢', 404));
  }

  // If the record session is deleted successfully
  res.status(200).json({
      status: 'success',
      message: 'Record session deleted successfully 🎉'
    });
  });

// GET RECORD SESSION
exports.getRecordSession = catchAsync(async (req, res, next) => {
  // Extract record session ID from request parameters
  const { recrdsessionid } = req.params;
  const recordSession = await recrdsessionModel.getRecordSession(recrdsessionid);

  // If no record session is found with the provided ID
  if (!recordSession || recordSession.length === 0) {
    return next(new AppError('No record session found with that ID 😢', 404));
  }

  // If the record session is found successfully
  res.status(200).json({
    status: 'success',
    message: 'Record session fetched successfully 🎉',
    data: {
      recordSession
    }
   });
  });

// GET ALL RECORD SESSIONS
exports.getAllRecordSessions = catchAsync(async (req, res, next) => {
  // Fetch all record sessions from the database
  const recordSessions = await recrdsessionModel.getAllRecordSessions();

  // If no record sessions are found
  if (!recordSessions || recordSessions.length === 0) {
    return next(new AppError('No record sessions found 😢', 404));
  }

  // If the record sessions are fetched successfully
  res.status(200).json({
    status: 'success',
    length: recordSessions.length,
    message: 'Record sessions fetched successfully 🎉',
    data: {
      recordSessions
    }
   });
  });



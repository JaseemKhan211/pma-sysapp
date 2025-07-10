const fs = require('fs');
const biosetupModel = require('../models/biosetupModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Create BIO SETUP
exports.createbiosetup = catchAsync(async (req, res, next) => {
    // Read binary file data
    const fileBuffer = req.file ? fs.readFileSync(req.file.path) : null;

    // Validate presence
    if (!req.body.bio_setupid || !fileBuffer || !req.body.usrid) {
      // If any of the required fields are missing, return an error response
      return res.status(400).json({ 
        status: 'fail', 
        message: 'All fields required (bio_setupid, file, usrid) 😢' 
      });
    }

    // Call model
    await biosetupModel.createbiosetup({
      bio_setupid: req.body.bio_setupid,
      bio_setup_data: fileBuffer,
      usrid: req.body.usrid
    });

    // If the bio setup is created successfully
    res.status(201).json({ 
        status: 'success',
        message: 'BIO Setup created successfully 🎉'
    });
  });

// Update BIO SETUP
exports.updatebiosetup = catchAsync(async (req, res, next) => {
  // Extract bio setup ID from request parameters
  // Note: The bio setup ID should be passed in the request body or as a URL parameter
  const { bio_setupid } = req.params;
  const updatedbiosetup = await biosetupModel.updatebiosetup({ ...req.body, bio_setupid });


    // If no bio setup is found with the provided ID
    if (!updatedbiosetup || updatedbiosetup.length === 0) {
      return next(new AppError('No bio setup found with that ID 😢', 404));
    }

    // Fetch the updated bio setup to return in the response
    const getbiosetup = await biosetupModel.getbiosetup(bio_setupid);

    // If the bio setup is updated successfully
    res.status(200).json({ 
        status: 'success', 
        message: 'Bio Setup updated successfully 🎉', 
        data: { 
            getbiosetup 
        }
      });
  });

// Delete BIO SETUP
exports.deletebiosetup = catchAsync(async (req, res, next) => {
  // Extract bio setup ID from request parameters
  // Note: The bio setup ID should be passed as a URL parameter
  const { bio_setupid } = req.params;
  await biosetupModel.deletebiosetup(bio_setupid);

  // If no bio setup is found with the provided ID
  if (!bio_setupid) {
    return next(new AppError('Bio Setup not found 😢', 404));
  }

  // if the bio setup is deleted successfully
  res.status(200).json({ 
      status: 'success', 
      message: 'Bio Setup deleted successfully 🎉' 
    });
  });

// Get BIO SETUP
exports.getbiosetup = catchAsync(async (req, res, next) => {
  // Extract biosetup ID from request parameters
  // Note: The biosetup ID should be passed as a URL parameter
  const { bio_setupid } = req.params;
  const biosetup = await biosetupModel.getbiosetup(bio_setupid);

    // If no biosetup is found with the provided ID
    if (!biosetup || biosetup.length === 0) {
      return next(new AppError('No biosetup found with that ID 😢', 404));
    }

  // If the biosetup is found, return it
    res.status(200).json({ 
        status: 'success', 
        data: biosetup 
    });
  });

// Get All BIO SETUP
exports.getAllbiosetup = catchAsync(async (req, res, next) => {
  // Fetch all bio setup from the database
  // Note: This function should return an array of all bio setup
  const biosetup = await biosetupModel.getAllbiosetup();

  // If no domains are found
  if (!biosetup || biosetup.length === 0) {
    return next(new AppError('No bio setup found 😢', 404));
  }

  // If bio setup are found, return them
  res.status(200).json({ 
      status: 'success', 
        message: 'All bio setup fetched successfully 🎉',
        results: biosetup.length,
        data: { 
          biosetup
        }
    });
  });


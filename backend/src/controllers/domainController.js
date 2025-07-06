const domainModel = require('../models/domainModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Create Domain
exports.createDomain = catchAsync(async (req, res, next) => {
    // Validate request body
    const newDomain = await domainModel.createDomain(req.body);

    // If the domain is created successfully
    res.status(201).json({ 
        status: 'success',
        message: 'Domain created successfully 🎉',
        data: { 
            newDomain 
        }
    });
  });

// Update Domain
exports.updateDomain = catchAsync(async (req, res, next) => {
  // Extract domain ID from request parameters
  // Note: The domain ID should be passed in the request body or as a URL parameter
  const { domainid } = req.params;
  const updatedDomain = await domainModel.updateDomain({ ...req.body, domainid });


    // If no domain is found with the provided ID
    if (!updatedDomain || updatedDomain.length === 0) {
      return next(new AppError('No domain found with that ID 😢', 404));
    }

    // Fetch the updated domain to return in the response
    const getDomain = await domainModel.getDomain(domainid);

    // If the domain is updated successfully
    res.status(200).json({ 
        status: 'success', 
        message: 'Domain updated successfully 🎉', 
        data: { 
            getDomain 
        }
      });
  });

// Delete Domain
exports.deleteDomain = catchAsync(async (req, res, next) => {
  // Extract domain ID from request parameters
  // Note: The domain ID should be passed as a URL parameter
  const { domainid } = req.params;
  await domainModel.deleteDomain(domainid);

  // If no domain is found with the provided ID
  if (!domainid) {
    return next(new AppError('Domain not found 😢', 404));
  }

    // if the domain is deleted successfully
  res.status(200).json({ 
      status: 'success', 
      message: 'Domain deleted successfully 🎉' 
    });
  });

// Get Domain
exports.getDomain = catchAsync(async (req, res, next) => {
  // Extract domain ID from request parameters
  // Note: The domain ID should be passed as a URL parameter
  const { domainid } = req.params;
  const domains = await domainModel.getDomain(domainid);

    // If no domain is found with the provided ID
    if (!domains || domains.length === 0) {
      return next(new AppError('No domain found with that ID 😢', 404));
    }

  // If the domain is found, return it
    res.status(200).json({ 
        status: 'success', 
        data: domains 
    });
  });

// GET ALL Domain
exports.getAllDomains = catchAsync(async (req, res, next) => {
  // Fetch all domains from the database
  // Note: This function should return an array of all domains
  const domains = await domainModel.getAllDomains();

  // If no domains are found
  if (!domains || domains.length === 0) {
    return next(new AppError('No domains found 😢', 404));
  }

  // If domains are found, return them
  res.status(200).json({ 
      status: 'success', 
        message: 'All domains fetched successfully 🎉',
        length: domains.length,
        data: domains 
    });
  });
const totpModel = require('../models/totpModel');
const catchAsync = require('../utils/catchAsync');

// Create TOTP
exports.createtotp = catchAsync(async (req, res, next) => {
    // Validate request body
    const newtotp = await totpModel.createtotp(req.body);

    // If the totp is created successfully
    res.status(201).json({ 
        status: 'success',
        message: 'TOTP created successfully 🎉',
        data: { 
            newtotp 
        }
    });
  });

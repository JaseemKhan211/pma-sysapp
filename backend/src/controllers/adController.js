const { searchUser, searchAllUsers } = require('../utils/ldapHelper');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Test Active Directory connection
exports.getADUser = catchAsync(async (req, res, next) => {
    // Test connection to Active Directory
    const { username } = req.params;
    const users = await searchUser(username);

    // Check if users were found
    if (!users || users.length === 0) {
        return next(new AppError('No users found in Active Directory 😢', 404));
    }

    // If users are found, return them in the response
    res.status(200).json({
      status: 'success',
      message: users.length > 1 ? 'Multiple users found' : 'Single user found',
      data: users[0]
    });
});

// Get all Active Directory users
exports.getAllADUsers = catchAsync(async (req, res, next) => {
  const users = await searchAllUsers();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: users
  });
});
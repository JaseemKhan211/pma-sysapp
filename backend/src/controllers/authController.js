const { createSendToken } = require('../middlewares/authMiddleware');
const User = require('../models/userModel');
const catchAsync = require('.././utils/catchAsync');
const AppError = require('.././utils/appError');
const { correctPassword } = require('../utils/passwordHelper');

// Controller to handle user login
exports.login = catchAsync(async (req, res, next) => {
  const { usrid, pw } = req.body;
  const userRows = await User.getUserLogin(usrid);
   
  // Check if user ID and password are provided
  if (!usrid || !pw) {
    return next(new AppError('Please provide user id and password.', 400));
  }

  // Check if user exists and password is correct
  const user = userRows[0];

  // If no user is found or the password does not match
  if (!user || !(await correctPassword(pw, user[1]))) {
    return next(new AppError('Incorrect user id or password', 401));
  }

  // If the user is found and password matches, create and send token
  createSendToken(user, 200, res);
});

// logout controller to clear the JWT cookie
exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ status: 'success' });
};

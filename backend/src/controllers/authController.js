const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const catchAsync = require('.././utils/catchAsync');
const AppError = require('.././utils/appError');
const { correctPassword } = require('../utils/passwordHelper');

// Function to sign a JWT token
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Function to create and send a token
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  }

  if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  // Remove the password the output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

// Controller to handle user login
exports.login = catchAsync(async (req, res, next) => {
  const { usrid, pw } = req.body;
  const userRows = await User.getUserLogin(usrid);
   
  // Check if user ID and password are provided
  if (!usrid || !pw) {
    return next(new AppError('Please provide user id and password.', 400));
  }

  // ERROR FIND LOG 💥
  // console.log('User from DB:', userRows); // User from DB: [ [ 'JK-01', '123@12' ] ]

  // Check if user exists and password is correct
  const user = userRows[0];

  // ERROR FIND LOG 💥
  // console.log('User found:', user); //  User found: [ 'JK-01', '123@12' ]

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
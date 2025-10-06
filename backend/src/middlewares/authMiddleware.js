const jwt = require('jsonwebtoken');

// Function to sign a JWT token
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

// Function to create and send a token
exports.createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id || user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true
  }

  if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('token', token, cookieOptions);
  // res.cookie('jwt', token, cookieOptions);

  // Remove the password the output
  if (user.password) user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};
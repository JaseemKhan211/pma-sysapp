const bcrypt = require('bcryptjs');

// Function to check if the password is correct
exports.correctPassword = async (inputPassword, dbPassword) => {
  return inputPassword === dbPassword;
};

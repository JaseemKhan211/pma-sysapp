const jwt = require('jsonwebtoken');
const oracledb = require('oracledb');

const User = require('../models/userModel');
const catchAsync = require('.././utils/catchAsync');
const AppError = require('.././utils/appError');
const { withConnection } = require('../utils/dbHelper');

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

exports.login = catchAsync(async (req, res, next) => {
  const { usrid, pw } = req.body;

  if (!usrid || !pw) {
    return next(new AppError('Please provide user id and password!', 400));
  }

  const users = await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_GET_SYUSR(:p_usrid, :out_cursor);
      END;`,
      {
        p_usrid: usrid,
        out_cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
      }
    );

    const rows = [];
    const rs = result.outBinds.out_cursor;
    let row;
    while ((row = await rs.getRow())) {
      rows.push(row);
    }
    await rs.close();
    return rows;
  });

  const dbUser = users[0];

  if (!dbUser || !(await User.correctPassword(pw, dbUser.PASSWORD))) {
    return next(new AppError('Incorrect user id or password', 401));
  }

  createSendToken(dbUser, 200, res);
});

exports.logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ status: 'success' });
};
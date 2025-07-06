const express = require('express');
const app = express();

// Importing routes
const domainRoutes = require('./routes/domainRoutes');

// Error handling middleware
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

// Middleware to parse JSON requests
app.use(express.json());

// ROUTES
app.use('/api/v1/domains', domainRoutes);

// catch unmatched routes
app.all('/', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// global error handler
app.use(globalErrorHandler);

module.exports = app;
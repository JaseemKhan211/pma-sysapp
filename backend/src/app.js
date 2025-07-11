const express = require('express');
const app = express();

// Importing routes
const domainRoutes = require('./routes/domainRoutes');
const userRoutes = require('./routes/userRoutes');
const totpRoutes = require('./routes/totpRoutes');
const biosetupRoutes = require('./routes/biosetupRoutes');
const endpointtypRoutes = require('./routes/endpointtypRoutes'); 
const endpointosRoutes = require('./routes/endpointosRoutes');

// Error handling middleware
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

// Middleware to parse JSON requests
app.use(express.json());

// ROUTES
app.use('/api/v1/domains', domainRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/totps', totpRoutes);
app.use('/api/v1/biosetups', biosetupRoutes);
app.use('/api/v1/endpointtyps', endpointtypRoutes);
app.use('/api/v1/endpointos', endpointosRoutes);

// catch unmatched routes
app.all('/', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// global error handler
app.use(globalErrorHandler);

module.exports = app;
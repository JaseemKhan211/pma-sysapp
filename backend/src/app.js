const express = require('express');

// Start express app
const app = express();

app.use(express.json()); // for JSON body parsing

const domainRoutes = require('./routes/domainRoutes');
app.use('/api/v1/domains', domainRoutes);

module.exports = app;



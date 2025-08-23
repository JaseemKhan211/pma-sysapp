const axios = require('axios');
const AppError = require('../utils/appError');

// Load configuration from environment variables
const baseUrl = process.env.GUAC_BASE_URL;
const guacUsername = process.env.GUAC_USERNAME;
const guacPassword = process.env.GUAC_PASSWORD;
const dataSource = process.env.DATA_SOURCE;

// Validate essential configuration
exports.guacLogin = async () => {
  try {
    const response = await axios.post(
      `${baseUrl}/tokens`,
      new URLSearchParams({
        username: guacUsername,
        password: guacPassword
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    return response.data.authToken;
  } catch (err) {
    throw new AppError('Failed to login to Guacamole API', 500);
  }
};

// Fetch all available Guacamole connections
exports.getConnections = async () => {
  try {
    const token = await exports.guacLogin();

    const response = await axios.get(
      `${baseUrl}/session/data/${dataSource}/connections`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data;
  } catch (err) {
    throw new AppError('Failed to fetch connections from Guacamole', 500);
  }
};

// Generate a connection tunnel URL for a specific connection ID
exports.getConnectionTunnel = async (connectionId) => {
  try {
    const token = await exports.guacLogin();

    // Construct tunnel URL (Guacamole client view)
    return `${baseUrl.replace('/api', '')}/#/client/${connectionId}?token=${token}`;
  } catch (err) {
    throw new AppError('Failed to generate connection tunnel', 500);
  }
};

const axios = require("axios");
const AppError = require("../utils/appError");

const baseUrl = process.env.GUAC_BASE_URL;
const apiUrl = `${baseUrl}/api`;
const guacUsername = process.env.GUAC_USERNAME;
const guacPassword = process.env.GUAC_PASSWORD;

// token caching
let cachedToken = null;
let tokenExpiry = null;

/**
 * Login to Guacamole and get auth token (with caching)
 */
async function guacLogin() {
  // if token still valid, reuse
  if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  try {
    const response = await axios.post(
      `${apiUrl}/tokens`,
      new URLSearchParams({
        username: guacUsername,
        password: guacPassword,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        timeout: 5000,
      }
    );

    cachedToken = response.data.authToken;
    // guacamole default TTL ≈ 60 min, set expiry 55 min
    tokenExpiry = Date.now() + 55 * 60 * 1000;

    return cachedToken;
  } catch (err) {
    throw new AppError("Failed to login to Guacamole API", 500);
  }
}

/**
 * Start Guacamole connection for a given system
 * @param {Object} system - system object from OracleDB
 * @returns {String} URL to embed in frontend
 */
async function startConnection(system) {
  try {
    const authToken = await guacLogin();

    // direct client URL, no Guac DB insert
    const guacUrl = `${baseUrl}/#/client/${system.systemid}?token=${authToken}`;

    return guacUrl;
  } catch (err) {
    throw new AppError("Failed to start Guacamole connection", 500);
  }
}

module.exports = {
  guacLogin,
  startConnection,
};

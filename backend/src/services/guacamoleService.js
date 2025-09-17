const axios = require("axios");
const AppError = require("../utils/appError");

const baseUrl = process.env.GUAC_BASE_URL;
const apiUrl = `${baseUrl}/api`;
const guacUsername = process.env.GUAC_USERNAME;
const guacPassword = process.env.GUAC_PASSWORD;
const guacDatasource = process.env.GUAC_DATASOURCE || "mysql"; // ⭐ NEW: auto-pick datasource

// token caching
let cachedToken = null;
let tokenExpiry = null;

/**
 * Login to Guacamole and get auth token (with caching)
 */
async function guacLogin() {
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
 * Create (or reuse) Guacamole connection dynamically
 */
async function createConnection(system) {
  const authToken = await guacLogin();

  try {
    // 1. First check if connection already exists
    const existing = await axios.get(
      `${apiUrl}/session/data/${guacDatasource}/connections?token=${authToken}`
    );

    const found = Object.values(existing.data).find(
      (c) => c.name === system.hostname
    );

    if (found) {
      console.log(`✅ Connection already exists: ${found.name}`);
      return found.identifier; 
    }

    // 2. Build payload for new connection
    const connectionPayload = {
      name: `${system.systemid}-${system.hostname}`, // ensure unique name
      protocol: system.protocol || "rdp",
      parameters: {
        hostname: system.hostname,
        port: system.port?.toString() || "3389",
        username: system.username,
        password: system.pw,
        domain: system.domainid || "",
      },
      attributes: {
        "max-connections": "10",
        "max-connections-per-user": "2",
      },
    };

    // 3. Create connection if not found
    const response = await axios.post(
      `${apiUrl}/session/data/${guacDatasource}/connections?token=${authToken}`,
      connectionPayload,
      { headers: { "Content-Type": "application/json" } }
    );

    console.log(`🆕 New connection created: ${response.data.identifier}`);
    return response.data.identifier;

  } catch (err) {
    console.error("Guacamole createConnection error:", err.response?.data || err.message);
    throw new AppError("Failed to create Guacamole connection", 500);
  }
}

/**
 * Start Guacamole connection
 */
async function startConnection(system) {
  try {
    const authToken = await guacLogin();
    const connectionId = await createConnection(system);

    // direct client URL, no Guac DB insert
    const guacUrl = `${baseUrl}/#/client/${connectionId}?token=${authToken}`;

    return guacUrl;
  } catch (err) {
    throw new AppError("Failed to start Guacamole connection", 500);
  }
}

module.exports = {
  guacLogin,
  startConnection,
};

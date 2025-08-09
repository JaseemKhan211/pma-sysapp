const axios = require('axios');
const { getLocalIP } = require('../utils/getLocalIP');

exports.connectToSystem = async (req, res) => {
  try {
    const { targetIP } = req.query;
    if (!targetIP) {
      return res.status(400).json({ 
        status: 'fail', 
        message: 'Target IP required' 
    });
    }

    // Simulate connecting to target system
    const response = await axios.get(`http://${targetIP}:5001/allow-access`);
    res.json({
      status: 'success',
      fromIP: getLocalIP(),
      targetIP,
      targetResponse: response.data
    });
  } catch (err) {
    res.status(500).json({ 
        status: 'error', 
        message: err.message 
    });
  }
};
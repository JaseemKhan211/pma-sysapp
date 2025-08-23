const catchAsync = require('../utils/catchAsync');
const guacService = require('../services/guacamoleService');

// List all systems (connections) from Guacamole
exports.listSystems = catchAsync(async (req, res, next) => {
  const systems = await guacService.getConnections();

  res.status(200).json({
    status: 'success',
    data: systems
  });
});

// Access a specific system (connection) via Guacamole
exports.accessSystem = catchAsync(async (req, res, next) => {
  const { connectionId } = req.params;

  const tunnelUrl = await guacService.getConnectionTunnel(connectionId);

  res.status(200).json({
    status: 'success',
    tunnelUrl
  });
});
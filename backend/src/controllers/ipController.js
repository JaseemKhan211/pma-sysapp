const oracledb = require('oracledb')
const { withConnection } = require('../utils/dbHelper')
const os = require('os');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (let name of Object.keys(interfaces)) {
    for (let iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}

exports.verifyIP = async (req, res) => {
  try {
    const clientIp = getLocalIP();
    console.log('🔍 System IP:', clientIp);

    const result = await withConnection(async (conn) => {
      const binds = {
        out_cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
      };

      const result = await conn.execute(
        `BEGIN SP_GET_ALL_IPALLOWS(:out_cursor); END;`,
        binds
      );

      const resultSet = result.outBinds.out_cursor;
      const rows = await resultSet.getRows(); // fetch all rows
      await resultSet.close();

      return rows;
    });

    // 👇 Check if any row IP matches system IP
    const isAllowed = result.some(row => {
      const ipInDb = row[7]; // Assuming IP is the 8th column
      return ipInDb && ipInDb.trim() === clientIp;
    });

    console.log('✅ Match Found:', isAllowed);
    res.json({ allowed: isAllowed });

  } catch (err) {
    console.error('❌ IP check error:', err);
    res.status(500).json({
      allowed: false,
      error: 'Internal Server Error'
    });
  }
};

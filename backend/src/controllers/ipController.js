const oracledb = require('oracledb')
const { withConnection } = require('../utils/dbHelper')
const { getLocalIP } = require('../utils/getLocalIP')

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
      const rows = await resultSet.getRows(); 
      await resultSet.close();

      return rows;
    });

    // 👇 Check if any row IP matches system IP
    const isAllowed = result.some(row => {
      const ipInDb = row[7]; 
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

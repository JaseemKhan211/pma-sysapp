const db = require('../config/db');

exports.withConnection = async (fn) => {
  const conn = await db.getConnection();
  try {
    const result = await fn(conn);
    return result;
  } finally {
    await conn.close();
  }
};

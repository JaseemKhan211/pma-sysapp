const { withConnection } = require('../utils/dbHelper');

// CREATE
exports.createtotp = async (totp) => {
  return await withConnection(async (conn) => {
    await conn.execute(
      `BEGIN
        SP_INSERT_TOTP(:p_totp_code, :p_usrid);
       END;`,
      {
        p_totp_code: totp.totp_code,
        p_usrid: totp.usrid 
      }
    );
    await conn.commit();

    // ✅ return inserted id
    return {
        p_totp_code: totp.totp_code,
        p_usrid: totp.usrid
    };
  });
};
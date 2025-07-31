const oracledb = require('oracledb');
const { withConnection } = require('../utils/dbHelper');

//CREATE
exports.createIPallowed = async (ipallows) => {
  return await withConnection(async (conn) => {
    await conn.execute(
      `BEGIN
        SP_INSERT_IPALLOWS(:p_ipallows, :p_ipallows_yn, :p_usrid);
       END;`,
      {
        p_ipallows: ipallows.ipallows,
        p_ipallows_yn: ipallows.ipallows_yn,
        p_usrid: ipallows.usrid
      }
    );

    await conn.commit();

    // ✅ return inserted id
    return {
        ipallows: ipallows.ipallows,
        ipallows_yn: ipallows.ipallows_yn,
        usrid: ipallows.usrid
    };
  });
};

// UPDATE
exports.updateIPallowed = async (ipallows) => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_UPDATE_IPALLOWS(:p_ipallows, :p_ipallows_yn, :p_usrid, :p_rows_updated);
       END;`,
      {
        p_ipallows: ipallows.ipallows,
        p_ipallows_yn: ipallows.ipallows_yn,
        p_usrid: ipallows.usrid,
        p_rows_updated: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      }
    );
    await conn.commit();

    const rowsUpdated = result.outBinds.p_rows_updated;
    return rowsUpdated;
  });
};

//Delete
exports.deleteIPallowed = async (usrid) => {
  return await withConnection(async (conn) => {
    await conn.execute(
      `BEGIN
        SP_DELETE_IPALLOWS(:p_usrid);
       END;`,
      {
        p_usrid: usrid
      }
    );
    await conn.commit();
  });
};
    
// GET
exports.getIPallowed = async (usrid) => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_GET_IPALLOWS(:p_usrid, :out_cursor);
       END;`,
      {
        p_usrid: usrid,
        out_cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
      }
    );

    const rows = [];
    const rs = result.outBinds.out_cursor;

    let row;
    while ((row = await rs.getRow())) {
        rows.push(row);
    }

    await rs.close();
    return rows;
  });
};

// GET ALL
exports.getAllIPallowed = async () => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_GET_ALL_IPALLOWS(:out_cursor);
       END;`,
      {
        out_cursor: { dir: oracledb.BIND_OUT, type: oracledb.CURSOR }
      }
    );
    const rows = [];
    const rs = result.outBinds.out_cursor;

    let row;
    while ((row = await rs.getRow())) {
        rows.push(row);
    }

    await rs.close();
    return rows;
  });
};
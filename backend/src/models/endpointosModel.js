const oracledb = require('oracledb');
const { withConnection } = require('../utils/dbHelper');

// CREATE
exports.createEndpointOs = async (endpointOs) => {
  return await withConnection(async (conn) => {
    await conn.execute(
      `BEGIN
        SP_INSERT_ENDPOINTOS(:p_endpointosid, :p_endpointosname);
       END;`,
      {
        p_endpointosid: endpointOs.endpointosid,
        p_endpointosname: endpointOs.endpointosname
      }
    );

    await conn.commit();

    // ✅ return inserted id
    return {
        p_endpointosid: endpointOs.endpointosid,
        p_endpointosname: endpointOs.endpointosname
    };
  });
};

// UPDATE
exports.updateEndpointOs = async (endpointOs) => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_UPDATE_ENDPOINTOS(:p_endpointosid, :p_endpointosname, :p_rows_updated);
       END;`,
      {
        p_endpointosid: endpointOs.endpointosid,
        p_endpointosname: endpointOs.endpointosname,
        p_rows_updated: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      }
    );

    await conn.commit();

    const rowsUpdated = result.outBinds.p_rows_updated;
    return rowsUpdated;
  });
};

// DELETE
exports.deleteEndpointOs = async (endpointOsid) => {
  return await withConnection(async (conn) => {
    await conn.execute(
      `BEGIN
        SP_DELETE_ENDPOINTOS(:p_endpointosid);
       END;`,
      {
        p_endpointosid: endpointOsid
      }
    );

    await conn.commit();
  });
};

// GET
exports.getEndpointOs = async (endpointOsid) => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_GET_ENDPOINTOS(:p_endpointosid, :out_cursor);
       END;`,
      {
        p_endpointosid: endpointOsid,
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
exports.getAllEndpointOs = async () => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_GET_ALL_ENDPOINTOS(:out_cursor);
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
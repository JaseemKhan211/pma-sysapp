const oracledb = require('oracledb');
const { withConnection } = require('../utils/dbHelper');

// CREATE
exports.createEndpointType = async (endpointType) => {
  return await withConnection(async (conn) => {
    await conn.execute(
      `BEGIN
        SP_INSERT_ENDPOINTTYP(:p_endpointtypid, :p_endpointtypname);
       END;`,
      {
        p_endpointtypid: endpointType.endpointtypid,
        p_endpointtypname: endpointType.endpointtypname
      }
    );

    await conn.commit();

    // ✅ return inserted id
    return {
        p_endpointtypid: endpointType.endpointtypid,
        p_endpointtypname: endpointType.endpointtypname
    };
  });
};

// UPDATE
exports.updateEndpointType = async (endpointType) => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_UPDATE_ENDPOINTTYP(:p_endpointtypid, :p_endpointtypname, :p_rows_updated);
       END;`,
      {
        p_endpointtypid: endpointType.endpointtypid,
        p_endpointtypname: endpointType.endpointtypname,
        p_rows_updated: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      }
    );

    await conn.commit();

    const rowsUpdated = result.outBinds.p_rows_updated;
    return rowsUpdated;
  });
};

// DELETE
exports.deleteEndpointType = async (endpointtypid) => {
  return await withConnection(async (conn) => {
    await conn.execute(
      `BEGIN
        SP_DELETE_ENDPOINTTYP(:p_endpointtypid);
       END;`,
      {
        p_endpointtypid: endpointtypid
      }
    );

    await conn.commit();
  });
};

// GET
exports.getEndpointType = async (endpointtypid) => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_GET_ENDPOINTTYP(:p_endpointtypid, :out_cursor);
       END;`,
      {
        p_endpointtypid: endpointtypid,
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
exports.getAllEndpointTypes = async () => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_GET_ALL_ENDPOINTTYP(:out_cursor);
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
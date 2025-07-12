const oracledb = require('oracledb');
const { withConnection } = require('../utils/dbHelper');

// CREATE
exports.createEndpoint = async (endpoint) => {
  return await withConnection(async (conn) => {
    await conn.execute(
      `BEGIN
        SP_INSERT_ENDPOINT(:p_endpointid, :p_endpointname, :p_endpointipaddrss, :p_endpointport, :p_enddsc, :p_endpointtypid, :p_endpointosid);
       END;`,
      {
        p_endpointid: endpoint.endpointid,
        p_endpointname: endpoint.endpointname,
        p_endpointipaddrss: endpoint.endpointipaddrss,
        p_endpointport: endpoint.endpointport,
        p_enddsc: endpoint.enddsc,
        p_endpointtypid: endpoint.endpointtypid,
        p_endpointosid: endpoint.endpointosid
      }
    );

    await conn.commit();

    // ✅ return inserted id
    return {
        endpointid: endpoint.endpointid,
        endpointname: endpoint.endpointname,
        endpointipaddrss: endpoint.endpointipaddrss,
        endpointport: endpoint.endpointport,
        enddsc: endpoint.enddsc,
        endpointtypid: endpoint.endpointtypid,
        endpointosid: endpoint.endpointosid
    };
  });
};

// UPDATE
exports.updateEndpoint = async (endpoint) => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_UPDATE_ENDPOINT(:p_endpointid, :p_endpointname, :p_endpointipaddrss, :p_endpointport, :p_enddsc, :p_endpointtypid, :p_endpointosid, :p_rows_updated);
       END;`,
      {
        p_endpointid: endpoint.endpointid,
        p_endpointname: endpoint.endpointname,
        p_endpointipaddrss: endpoint.endpointipaddrss,
        p_endpointport: endpoint.endpointport,
        p_enddsc: endpoint.enddsc,
        p_endpointtypid: endpoint.endpointtypid,
        p_endpointosid: endpoint.endpointosid,
        p_rows_updated: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      }
    );

    await conn.commit();

    const rowsUpdated = result.outBinds.p_rows_updated;
    return rowsUpdated;
  });
};

// DELETE
exports.deleteEndpoint = async (endpointid) => {
  return await withConnection(async (conn) => {
    await conn.execute(
      `BEGIN
        SP_DELETE_ENDPOINT(:p_endpointid);
       END;`,
      {
        p_endpointid: endpointid
      }
    );

    await conn.commit();
  });
};

// GET
exports.getEndpoint = async (endpointid) => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_GET_ENDPOINT(:p_endpointid, :out_cursor);
       END;`,
      {
        p_endpointid: endpointid,
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
exports.getAllEndpoints = async () => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_GET_ALL_ENDPOINT(:out_cursor);
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
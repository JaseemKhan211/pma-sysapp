const oracledb = require('oracledb');
const { withConnection } = require('../utils/dbHelper');

// CREATE
exports.createEndpointAssign = async (endpointAssign) => {
  return await withConnection(async (conn) => {
    await conn.execute(
      `BEGIN
        SP_INSERT_ENDPOINTASSIGN(:p_endpointid, :p_usrid);
       END;`,
      {
        p_endpointid: endpointAssign.endpointid,
        p_usrid: endpointAssign.usrid
      }
    );

    await conn.commit();

    // ✅ return inserted id
    return {
        p_endpointid: endpointAssign.endpointid,
        p_usrid: endpointAssign.usrid
    };
  });
};

// GET ALL 
exports.getAllEndpointAssigns = async () => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_GET_ALL_ENDPOINTASSIGN(:out_cursor);
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
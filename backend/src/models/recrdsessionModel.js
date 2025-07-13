const oracledb = require('oracledb');
const { withConnection } = require('../utils/dbHelper');

// CREATE
exports.createRecordSession = async (recordSession) => {
  return await withConnection(async (conn) => {
    await conn.execute(
      `BEGIN
        SP_INSERT_RECRDSESSION(:p_recrdsessionid, :p_recsession, :p_recdate, :p_duration, :p_recsize, :p_usrid);
       END;`,
      {
        p_recrdsessionid: recordSession.recrdsessionid,
        p_recsession: recordSession.recsession,
        p_recdate: recordSession.recdate,
        p_duration: recordSession.duration,
        p_recsize: recordSession.recsize,
        p_usrid: recordSession.usrid
      }
    );

    await conn.commit();

    // ✅ return inserted id
    return {
        p_recrdsessionid: recordSession.recrdsessionid,
        p_recsession: recordSession.recsession,
        p_recdate: recordSession.recdate,
        p_duration: recordSession.duration,
        p_recsize: recordSession.recsize,
        p_usrid: recordSession.usrid
    };
  });
};

// UPDATE
exports.updateRecordSession = async (recordSession) => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_UPDATE_RECRDSESSION(:p_recrdsessionid, :p_recsession, :p_recdate, :p_duration, :p_recsize, :p_usrid, :p_rows_updated);
       END;`,
      {
        p_recrdsessionid: recordSession.recrdsessionid,
        p_recsession: recordSession.recsession,
        p_recdate: recordSession.recdate,
        p_duration: recordSession.duration,
        p_recsize: recordSession.recsize,
        p_usrid: recordSession.usrid,
        p_rows_updated: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      }
    );

    await conn.commit();

    const rowsUpdated = result.outBinds.p_rows_updated;
    return rowsUpdated;
  });
};

// DELETE
exports.deleteRecordSession = async (recrdsessionid) => {
  return await withConnection(async (conn) => {
    await conn.execute(
      `BEGIN
        SP_DELETE_RECRDSESSION(:p_recrdsessionid);
       END;`,
      {
        p_recrdsessionid: recrdsessionid
      }
    );

    await conn.commit();
  });
};

// GET
exports.getRecordSession = async (recrdsessionid) => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_GET_RECRDSESSION(:p_recrdsessionid, :out_cursor);
       END;`,
      {
        p_recrdsessionid: recrdsessionid,
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
exports.getAllRecordSessions = async () => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_GET_ALL_RECRDSESSION(:out_cursor);
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
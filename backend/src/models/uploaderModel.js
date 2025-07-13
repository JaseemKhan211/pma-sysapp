const oracledb = require('oracledb');
const { withConnection } = require('../utils/dbHelper');

// CREATE
exports.createUploader = async (uploader) => {
  return await withConnection(async (conn) => {
    await conn.execute(
      `BEGIN
        SP_INSERT_UPLOADER(:p_uploaderid, :p_uplname, :p_uplsize, :p_upltype, :p_upldate, :p_uplstatus, :p_usrid);
       END;`,
      {
        p_uploaderid: uploader.uploaderid,
        p_uplname: uploader.uplname,
        p_uplsize: uploader.uplsize,
        p_upltype: uploader.upltype,
        p_upldate: uploader.upldate,
        p_uplstatus: uploader.uplstatus,
        p_usrid: uploader.usrid
      }
    );

    await conn.commit();

    // ✅ return inserted id
    return {
        p_uploaderid: uploader.uploaderid,
        p_uplname: uploader.uplname,
        p_uplsize: uploader.uplsize,
        p_upltype: uploader.upltype,
        p_upldate: uploader.upldate,
        p_uplstatus: uploader.uplstatus,
        p_usrid: uploader.usrid
    };
  });
};

// UPDATE
exports.updateUploader = async (uploader) => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_UPDATE_UPLOADER(:p_uploaderid, :p_uplname, :p_uplsize, :p_upltype, :p_upldate, :p_uplstatus, :p_usrid, :p_rows_updated);
       END;`,
      {
        p_uploaderid: uploader.uploaderid,
        p_uplname: uploader.uplname,
        p_uplsize: uploader.uplsize,
        p_upltype: uploader.upltype,
        p_upldate: uploader.upldate,
        p_uplstatus: uploader.uplstatus,
        p_usrid: uploader.usrid,
        p_rows_updated: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      }
    );

    await conn.commit();

    const rowsUpdated = result.outBinds.p_rows_updated;
    return rowsUpdated;
  });
};

// DELETE
exports.deleteUploader = async (uploaderid) => {
  return await withConnection(async (conn) => {
    await conn.execute(
      `BEGIN
        SP_DELETE_UPLOADER(:p_uploaderid);
       END;`,
      {
        p_uploaderid: uploaderid
      }
    );

    await conn.commit();
  });
};

// GET
exports.getUploader = async (uploaderid) => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_GET_UPLOADER(:p_uploaderid, :out_cursor);
       END;`,
      {
        p_uploaderid: uploaderid,
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
exports.getAllUploaders = async () => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_GET_ALL_UPLOADER(:out_cursor);
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
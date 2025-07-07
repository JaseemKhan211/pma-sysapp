const oracledb = require('oracledb');
const { withConnection } = require('../utils/dbHelper');

// CREATE
exports.createbiosetup = async (biosetup) => {
  return await withConnection(async (conn) => {
    await conn.execute(
      `BEGIN
        SP_INSERT_BIO_SETUP(:p_bio_setupid, :p_bio_setup_data, :p_usrid);
       END;`,
      {
        p_bio_setupid: biosetup.bio_setupid,
        p_bio_setup_data: biosetup.bio_setup_data,
        p_usrid: biosetup.usrid 
      }
    );
    await conn.commit();

    // ✅ return inserted id
    return {
        p_bio_setupid: biosetup.bio_setupid,
        p_bio_setup_data: biosetup.bio_setup_data,
        p_usrid: biosetup.usrid
    };
  });
};

// UPDATE
exports.updatebiosetup = async (biosetup) => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_UPDATE_BIO_SETUP(:p_bio_setupid, :p_bio_setup_data, :p_usrid);
       END;`,
      {
        p_bio_setupid: biosetup.bio_setupid,
        p_bio_setup_data: biosetup.bio_setup_data,
        p_usrid: biosetup.usrid,
        p_rows_updated: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      }
    );
    await conn.commit();

    const rowsUpdated = result.outBinds.p_rows_updated;
    return rowsUpdated;
  });
};

// DELETE
exports.deletebiosetup = async (biosetupid) => {
  return await withConnection(async (conn) => {
    await conn.execute(
      `BEGIN
        SP_DELETE_BIO_SETUP(:p_bio_setupid);
       END;`,
      {
        p_bio_setupid: biosetupid.bio_setupid
      }
    );
    await conn.commit();
  });
};

// GET
exports.getbiosetup = async (biosetupid) => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_GET_BIO_SETUP(:p_bio_setupid, :out_cursor);
       END;`,
      {
        p_bio_setupid: biosetupid.bio_setupid,
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
exports.getAllbiosetup = async () => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_GET_ALL_BIO_SETUP(:out_cursor);
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
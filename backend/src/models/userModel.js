const oracledb = require('oracledb');
const { withConnection } = require('../utils/dbHelper');

//CREATE
exports.createUser = async (user) => {
  return await withConnection(async (conn) => {
    await conn.execute(
      `BEGIN
        SP_INSERT_SYUSR(:p_syusrtypid, :p_usrid, :p_usrname, :p_pw, :p_email, :p_mobile, :p_active_yn, :p_expdt, :p_lock_yn, :p_admin_yn, :p_manager_yn, :p_domainid);
       END;`,
      {
        p_syusrtypid: user.syusrtypid,
        p_usrid: user.usrid,
        p_usrname: user.usrname,
        p_pw: user.pw,
        p_email: user.email,
        p_mobile: user.mobile,
        p_active_yn: user.active_yn,
        p_expdt: user.expdt,
        p_lock_yn: user.lock_yn,
        p_admin_yn: user.admin_yn,
        p_manager_yn: user.manager_yn,
        p_domainid: user.domainid
      }
    );

    await conn.commit();

    // ✅ return inserted id
    return {
        p_syusrtypid: user.syusrtypid,
        p_usrid: user.usrid,
        p_usrname: user.usrname,
        p_pw: user.pw,
        p_email: user.email,
        p_mobile: user.mobile,
        p_active_yn: user.active_yn,
        p_expdt: user.expdt,
        p_lock_yn: user.lock_yn,
        p_admin_yn: user.admin_yn,
        p_manager_yn: user.manager_yn,
        p_domainid: user.domainid
    };
  });
};

// UPDATE
exports.updateUser = async (user) => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_UPDATE_SYUSR(:p_usrid, :p_usrname, :p_pw, :p_email, :p_mobile, :p_active_yn, :p_expdt, :p_lock_yn, :p_admin_yn, :p_manager_yn, :p_rows_updated);
       END;`,
      {
        p_usrid: user.usrid,
        p_usrname: user.usrname,
        p_pw: user.pw,
        p_email: user.email,
        p_mobile: user.mobile,
        p_active_yn: user.active_yn,
        p_expdt: user.expdt,
        p_lock_yn: user.lock_yn,
        p_admin_yn: user.admin_yn,
        p_manager_yn: user.manager_yn,
        p_rows_updated: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
      }
    );
    await conn.commit();

    const rowsUpdated = result.outBinds.p_rows_updated;
    return rowsUpdated;
  });
};

//Delete
exports.deleteUser = async (usrid) => {
  return await withConnection(async (conn) => {
    await conn.execute(
      `BEGIN
        SP_DELETE_SYUSR(:p_usrid);
       END;`,
      {
        p_usrid: usrid
      }
    );
    await conn.commit();
  });
};
    
// GET
exports.getUser = async (usrid) => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_GET_SYUSR(:p_usrid, :out_cursor);
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
exports.getAllUser = async () => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_GET_ALL_SYUSR(:out_cursor);
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

// GET USER LOGIN
exports.getUserLogin = async (usrid) => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_GET_SYUSR_LOGIN(:p_usrid, :out_cursor);
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
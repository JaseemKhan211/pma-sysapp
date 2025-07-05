const { withConnection } = require('../utils/dbHelper');

// CREATE
exports.createDomain = async (domain) => {
  return await withConnection(async (conn) => {
    await conn.execute(
      `BEGIN
        SP_INSERT_DOMAIN(:p_domainid, :p_domainname, :p_dsc);
       END;`,
      {
        p_domainid: domain.domainid,
        p_domainname: domain.domainname,
        p_dsc: domain.dsc
      }
    );
    await conn.commit();

    // ✅ return inserted id
    return {
      domainid: domain.domainid,
      domainname: domain.domainname,
      dsc: domain.dsc
    };
  });
};

// UPDATE
exports.updateDomain = async (domain) => {
  return await withConnection(async (conn) => {
    await conn.execute(
      `BEGIN
        SP_UPDATE_DOMAIN(:p_domainid, :p_domainname, :p_dsc);
       END;`,
      {
        p_domainid: domain.domainid,
        p_domainname: domain.domainname,
        p_dsc: domain.dsc
      }
    );
    await conn.commit();
  });
};

// DELETE
exports.deleteDomain = async (domainid) => {
  return await withConnection(async (conn) => {
    await conn.execute(
      `BEGIN
        SP_DELETE_DOMAIN(:p_domainid);
       END;`,
      {
        p_domainid: domainid
      }
    );
    await conn.commit();
  });
};

// GET
exports.getDomain = async (domainid) => {
  return await withConnection(async (conn) => {
    const result = await conn.execute(
      `BEGIN
        SP_GET_DOMAIN(:p_domainid, :out_cursor);
       END;`,
      {
        p_domainid: domainid,
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
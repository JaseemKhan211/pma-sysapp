const oracledb = require('oracledb');
const { withConnection } = require('../utils/dbHelper');

// CREATE
exports.createSystem = async (system) => {
    return await withConnection(async (conn) => {
        await conn.execute(
            `BEGIN
                SP_INSERT_SYSTEMS(:p_systemid, :p_hostname, :p_ip_address, :p_loc, :p_protocol, :p_port, :p_tmeout, :p_username, :p_pw, :p_domainid);
            END;`,
            {
                p_systemid: system.systemid,
                p_hostname: system.hostname,
                p_ip_address: system.ip_address,
                p_loc: system.loc,
                p_protocol: system.protocol,
                p_port: system.port,
                p_tmeout: system.tmeout,
                p_username: system.username,
                p_pw: system.pw,
                p_domainid: system.domainid 
            }
        );

        await conn.commit();

        // ✅ return inserted id
        return {
            p_systemid: system.systemid,
            p_hostname: system.hostname,
            p_ip_address: system.ip_address,
            p_loc: system.loc,
            p_protocol: system.protocol,
            p_port: system.port,
            p_tmeout: system.tmeout,
            p_username: system.username,
            p_pw: system.pw,
            p_domainid: system.domainid  
        };
    });
};

// UPDATE
exports.updateSystem = async (system) => {
    return withConnection(async (conn) => {
        const result = await conn.execute(
            `BEGIN
                SP_UPDATE_SYSTEMS(:p_systemid, :p_hostname, :p_ip_address, :p_loc, :p_protocol, :p_port, :p_tmeout, :p_username, :p_pw, :p_domainid, :p_rows_updated);
            END;`,
            {
                p_systemid: system.systemid,
                p_hostname: system.hostname,
                p_ip_address: system.ip_address,
                p_loc: system.loc,
                p_protocol: system.protocol,
                p_port: system.port,
                p_tmeout: system.tmeout,
                p_username: system.username,
                p_pw: system.pw,
                p_domainid: system.domainid,
                p_rows_updated: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER } 
            }
        );

        await conn.commit();

        const rowsUpdated = result.outBinds.p_rows_updated;
        return rowsUpdated;
    });
};

// DELETE
exports.deleteSystem = async (systemid) => {
    return await withConnection(async (conn) => {
    await conn.execute(
      `BEGIN
        SP_DELETE_SYSTEMS(:p_systemid);
       END;`,
      {
        p_systemid: systemid
      }
    );
    await conn.commit();
  });
};

// GET 
exports.getSystem = async (systemid) => {
    return await withConnection(async (conn) => {
        const result = await conn.execute(
          `BEGIN
            SP_GET_SYSTEMS(:p_systemid, :out_cursor);
           END;`,
          {
            p_systemid: systemid,
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
    })
};

// GET ALL
exports.getAllSystem = async () => {
    return await withConnection(async (conn) => {
        const result = await conn.execute(
          `BEGIN
            SP_GET_ALL_SYSTEMS(:out_cursor);
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
    })
};

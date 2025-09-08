const systemModel = require('./systemModel');

// Map Oracle rows → object
function mapSystemRow(row) {
  return {
    id: row[0],
    systemid: row[7],
    ip_address: row[2],
    loc: row[8],
    hostname: row[1],
    username: row[12],
    protocol: row[9],
    port: row[10],
    timeout: row[11],
    pw: row[13],
    domainid: row[14],
  };
}

// Get system as object for Guacamole
exports.getSystemForGuac = async (systemid) => {
  const rows = await systemModel.getSystem(systemid);
  if (!rows || rows.length === 0) return null;
  return mapSystemRow(rows[0]);
};
const systemModel = require('./systemModel');

// Map Oracle rows → object
function mapSystemRow(row) {
  return {
    systemid: row[7],
    hostname: row[1],
    protocol: row[9],
    port: row[10],
    loc: row[8],
    timeout: row[11],
    username: row[12],
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
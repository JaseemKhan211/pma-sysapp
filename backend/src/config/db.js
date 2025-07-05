const oracledb = require('oracledb');

// Optional: only if you use Thick mode & ORACLE_CLIENT_PATH is defined
// if (process.env.ORACLE_CLIENT_PATH) {
//     oracledb.initOracleClient({ libDir: process.env.ORACLE_CLIENT_PATH });
// }

// initialize pool when app starts
async function initPool() {
    try {
        await oracledb.createPool({
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            connectString: process.env.DATABASE,
            poolMin: 1,
            poolMax: 5,
            poolIncrement: 1
        });
        console.log("✅ Oracle DB connection pool started.");
    } catch (err) {
        console.error("❌ Failed to create Oracle DB pool:", err.message);
        process.exit(1);
    }
}

// get a connection from pool
async function getConnection() {
    return await oracledb.getConnection();
}

// close pool when app exits
async function closePool() {
    await oracledb.getPool().close(10);
}

process.on('SIGINT', async () => {
    console.log('\n🔻 Closing Oracle connection pool...');
    await closePool();
    process.exit(0);
});

module.exports = {
    initPool,
    getConnection,
    closePool
};

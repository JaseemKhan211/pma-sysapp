const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const oracledb = require('oracledb');
const http = require('http');
const app = require('./app');

// Optional: only if you use Thick mode & ORACLE_CLIENT_PATH is defined
if (process.env.ORACLE_CLIENT_PATH) {
    oracledb.initOracleClient({ libDir: process.env.ORACLE_CLIENT_PATH });
}

const DB = async () => {
    return await oracledb.getConnection({
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        connectionString: process.env.DATABASE
    });
};

DB()
    .then(() => {
        console.log("✅ Oracle DB connected successfully.");
    })
    .catch(err => {
        console.error("❌ Failed to connect to Oracle DB:", err.message);
        process.exit(1);
    });

// Create server
const server = http.createServer(app);

const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`✅ App running on port ${port}...`);
});
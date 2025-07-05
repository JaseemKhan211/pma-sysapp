const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const http = require('http');
const app = require('./src/app');
const db = require('./src/config/db');

const port = process.env.PORT || 5000;

// Initialize Oracle DB connection pool
db.initPool();

// Create server
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`✅ App running on port ${port}...`);
});

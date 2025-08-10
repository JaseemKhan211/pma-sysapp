const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const http = require('http');
const app = require('./src/app');
const db = require('./src/config/db');
const { Server } = require('socket.io');

const port = process.env.PORT || 5000;

// Initialize Oracle DB connection pool
db.initPool();

// Create server
const server = http.createServer(app);

// Attach Socket.IO
const io = new Server(server, {
    cors: {
        origin: '*', // remote control ke liye allow
        methods: ['GET', 'POST']
    }
});

// Listen for socket connections
io.on('connection', (socket) => {
    console.log('🔌 Client connected:', socket.id);

    socket.on('send-command', (command) => {
        console.log(`📢 Command received: ${command}`);
        // broadcast to all clients
        io.emit('execute-command', command);
    });

    socket.on('disconnect', () => {
        console.log('❌ Client disconnected:', socket.id);
    });
});

server.listen(port, () => {
    console.log(`✅ App running on port ${port}...`);
});
const express = require('express');
const { getLocalIP } = require('./getLocalIP');
const { io } = require('socket.io-client');

const app = express();

// Socket.IO client connect to System A
const socket = io('http://<SYSTEM_A_IP>:5000');

socket.on('connect', () => {
    console.log('✅ Connected to Controller');
});

socket.on('execute-command', (command) => {
    console.log(`⚡ Received command: ${command}`);
});

app.get('/allow-access', (req, res) => {
    res.json({
        message: 'Access granted',
        systemIP: getLocalIP()
    });
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Target System B ready on port ${PORT}`);
});

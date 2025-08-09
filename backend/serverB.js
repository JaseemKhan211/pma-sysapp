const express = require('express');
const { getLocalIP } = require('./getLocalIP');

const app = express();

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

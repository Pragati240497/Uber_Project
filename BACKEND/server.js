
const http = require('http');
const app = require('./app');
require('./DB/db');
const { initializeSocket } = require('./socket');

const port = process.env.PORT || 4000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO using custom logic from socket.js
initializeSocket(server);

// Start the server
server.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});

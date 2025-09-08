const http = require('http');
const app = require('./app');
require('./DB/db');
const { initializeSocket } = require('./socket');

const port = process.env.PORT || 4000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO using your custom logic
initializeSocket(server);

server.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});

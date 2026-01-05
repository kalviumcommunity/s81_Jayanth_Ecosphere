// server.js
require("dotenv").config();

const http = require("http");
const { app } = require("./app");
const connection = require("./db/connection");
const { setupSocket } = require("./socket"); // ⬅️ Your socket.io logic

const PORT = process.env.PORT || 4567;

// Create HTTP server
const server = http.createServer(app);

// Setup WebSocket
setupSocket(server); // ⬅️ Attach Socket.IO to this server

// Connect to DB and start server
(async () => {
  try {
    await connection ; // ✅ Connect to MongoDB
    server.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
})();

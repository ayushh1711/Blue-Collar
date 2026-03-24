import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { config } from './config/env.js';

const PORT = config.port;
const httpServer = createServer(app);

// Socket.io setup - allow all origins for LAN access
export const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Each user joins a room based on their userId
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Listen on 0.0.0.0 so other devices on the network can connect
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Network access: http://10.60.233.189:${PORT}`);
  console.log(`Environment: ${config.nodeEnv}`);
});

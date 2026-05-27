import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import { config } from './config/env.js';

const PORT = config.port;
const httpServer = createServer(app);

// Socket.io — allow all origins (handles both local and production)
export const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Railway assigns PORT dynamically — must listen on 0.0.0.0
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${config.nodeEnv}`);
});

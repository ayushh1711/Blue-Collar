import { createServer } from 'http';
import { initSocket, getIO } from './config/socket.js';
import app from './app.js';
import { config } from './config/env.js';

const PORT = config.port;
const httpServer = createServer(app);

// Socket.io initialization
export const io = initSocket(httpServer);
export { getIO };

// Railway assigns PORT dynamically — must listen on 0.0.0.0
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${config.nodeEnv}`);
});

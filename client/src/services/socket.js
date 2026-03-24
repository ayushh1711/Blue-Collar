import { io } from 'socket.io-client';

// Always connect via the same host that served the page
// This works for both localhost and other devices on the LAN
export const socket = io('/', {
  withCredentials: true,
  autoConnect: false
});

export const connectSocket = (userId) => {
  if (!socket.connected) {
    socket.connect();
  }
  if (userId) {
    socket.emit('join', userId);
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

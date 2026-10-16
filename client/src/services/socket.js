import { io } from 'socket.io-client';

// In production: connect directly to backend URL
// In development: connect via Vite proxy (same origin)
const SOCKET_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/+$/, '') : '/';

export const socket = io(SOCKET_URL, {
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

import { io, Socket } from 'socket.io-client';
let socket: Socket;

export const initSocket = () => {
  socket = io(process.env.NEXT_PUBLIC_API_URL);
  return socket;
};

export const getSocket = () => {
  if (!socket) throw new Error('Socket not initialized');
  return socket;
};

import openSocket from 'socket.io-client';

const socket = openSocket('http://mozart_backend:3001');

export const subscribeToNetworkStatz = (cb, interval) => {
  socket.on('networkStatz', message => cb(message));
  return socket.emit('subscribeToNetworkStatz', interval);
};

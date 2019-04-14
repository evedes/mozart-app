import openSocket from 'socket.io-client';

const socket = openSocket('http://mozart_backend:3001');

export const subscribeToNetworkStatz = (cb, chartingPeriod, pollingPeriod) => {
  socket.on('networkStatz', networkStatz => cb(networkStatz));
  return socket.emit('subscribeToNetworkStatz', chartingPeriod, pollingPeriod);
};

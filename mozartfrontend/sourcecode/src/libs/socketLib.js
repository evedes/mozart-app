import openSocket from 'socket.io-client';

const socket = openSocket('http://mozart_backend:3001');

export const subscribeToNetworkStatz = (cb, chartingPeriod, pollingPeriod) => {
  socket.on('networkStatz', networkStatz => cb(networkStatz));
  return socket.emit('subscribeToNetworkStatz', chartingPeriod, pollingPeriod);
};

export const subscribeToMemoryStatz = (cb, chartingPeriod, pollingPeriod) => {
  socket.on('memoryStatz', memoryStatz => cb(memoryStatz));
  return socket.emit('subscribeToMemoryStatz', chartingPeriod, pollingPeriod);
};

export const subscribeToCpuStatz = (cb, chartingPeriod, pollingPeriod) => {
  socket.on('cpuStatz', cpuStatz => cb(cpuStatz));
  return socket.emit('subscribeToCpuStatz', chartingPeriod, pollingPeriod);
};

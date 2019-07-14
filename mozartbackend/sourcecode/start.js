const mongoose = require('mongoose');
const socketIo = require('socket.io');
const app = require('./app');
const getNetworkStatz = require('./libs/getNetworkStatz');
const getMemoryStatz = require('./libs/getMemoryStatz');
const getCpuStatz = require('./libs/getCpuStatz');

require('dotenv').config({ path: '.env' });

const { PORT, DATABASE } = process.env;
let mongodbErrorCounter = 0;

// MONGOOSE CONNECTION TO MONGO
mongoose.Promise = global.Promise;

const connectWithRetry = () =>
  mongoose.connect(DATABASE, { useNewUrlParser: true });

mongoose.connect(DATABASE, { useNewUrlParser: true });

mongoose.connection.on('error', err => {
  mongodbErrorCounter += 1;
  if (mongodbErrorCounter >= 10) {
    console.log('Terminate process, MongoDB Connection Errors exceeded limit');
    process.exit(1);
  }
  console.log(`MongoDB Connection Error: ${err}`);
  setTimeout(connectWithRetry, 5000);
});

mongoose.connection.on('connected', () => {
  mongodbErrorCounter = 0;
  console.log(`🚀  MongoDB is Connected...`);
});

// APP INITIALIZATION - STARTING SERVER... 🚀

app.set('port', PORT);

const server = app.listen(app.get('port'), () => {
  console.log('------------------------------------------------------------');
  console.log(`🚀  Mozart_Backend API: listening on PORT ${PORT}!`);
});

// INITIALIZE SOCKET CONNECTIONS

const io = socketIo(server);
// io.origins(['*:*']);

let networkStatzInterval;
let memoryStatzInterval;
let cpuStatzInterval;

io.on('connection', socket => {
  console.log(`🚀  Mozart_Backend API: Client Connected To WebSockets 💥`);
  console.log('------------------------------------------------------------\n');
  socket.on('disconnect', () => {
    clearInterval(networkStatzInterval);
    clearInterval(memoryStatzInterval);
    clearInterval(cpuStatzInterval);
  });
  socket.on('subscribeToNetworkStatz', (chartingPeriod, pollingPeriod) => {
    // load initial data
    getNetworkStatz(networkStatz => {
      socket.emit('networkStatz', networkStatz);
    }, chartingPeriod);
    // stream with interval
    if (networkStatzInterval) {
      clearInterval(networkStatzInterval);
    }
    networkStatzInterval = setInterval(() => {
      getNetworkStatz(networkStatz => {
        console.log(
          '⏲️ WS Streams Period (NetworkStatz): ',
          pollingPeriod,
          '\n'
        );
        socket.emit('networkStatz', networkStatz);
      }, chartingPeriod);
    }, pollingPeriod);
  });
  socket.on('subscribeToMemoryStatz', (chartingPeriod, pollingPeriod) => {
    // load initial data
    getMemoryStatz(memoryStatz => {
      socket.emit('memoryStatz', memoryStatz);
    }, chartingPeriod);
    // stream with interval
    if (memoryStatzInterval) {
      clearInterval(memoryStatzInterval);
    }
    memoryStatzInterval = setInterval(() => {
      getMemoryStatz(memoryStatz => {
        console.log(
          '⏲️ WS Streams Period (MemoryStatz): ',
          pollingPeriod,
          '\n'
        );
        socket.emit('memoryStatz', memoryStatz);
      }, chartingPeriod);
    }, pollingPeriod);
  });
  socket.on('subscribeToCpuStatz', (chartingPeriod, pollingPeriod) => {
    // load initial data
    getCpuStatz(cpuStatz => {
      socket.emit('cpuStatz', cpuStatz);
    }, chartingPeriod);
    // stream with interval
    if (cpuStatzInterval) {
      clearInterval(cpuStatzInterval);
    }
    cpuStatzInterval = setInterval(() => {
      getCpuStatz(cpuStatz => {
        console.log('⏲️ WS Streams Period (CpuStatz): ', pollingPeriod, '\n');
        socket.emit('cpuStatz', cpuStatz);
      }, chartingPeriod);
    }, pollingPeriod);
  });
});

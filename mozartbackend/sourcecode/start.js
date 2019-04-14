const mongoose = require('mongoose');
const socket = require('socket.io');
const app = require('./app');
const getNetworkStatz = require('./libs/getNetworkStatz');

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

// SOCKET CONNECTIONS
const io = socket(server);
// io.origins(['*:*']);

io.on('connection', client => {
  console.log(`🚀  Mozart_Backend API: Client Connected To WebSockets 💥`);
  console.log('------------------------------------------------------------\n');
  client.on('subscribeToNetworkStatz', (chartingPeriod, pollingPeriod) => {
    // load initial data
    getNetworkStatz(networkStatz => {
      client.emit('networkStatz', networkStatz);
    }, chartingPeriod);
    // stream with interval
    setInterval(() => {
      getNetworkStatz(networkStatz => {
        console.log('pollingPeriod', pollingPeriod);
        client.emit('networkStatz', networkStatz);
      }, chartingPeriod);
    }, pollingPeriod);
  });
});

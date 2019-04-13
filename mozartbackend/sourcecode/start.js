const mongoose = require('mongoose');
const socket = require('socket.io');
const moment = require('moment');
const app = require('./app');

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
  console.log('--------------------------------------------------');
  console.log(`🚀  MongoDB is Connected...`);
  console.log('--------------------------------------------------\n');
});

// APP INITIALIZATION - STARTING SERVER... 🚀

app.set('port', PORT);

const server = app.listen(app.get('port'), () => {
  console.log('--------------------------------------------------');
  console.log(`🚀  Mozart_Backend API: listening on PORT ${PORT}!`);
  console.log('--------------------------------------------------\n');
});

// SOCKET CONNECTIONS
const io = socket(server);
// io.origins(['*:*']);

const networkStatz = () => [
  { txSec: 3, rxSec: -5, date: moment() },
  { txSec: 3, rxSec: -5, date: moment().add('minute', 2) },
  { txSec: 2, rxSec: -1, date: moment().add('minute', 5) },
];

io.on('connection', networkStatzSocket => {
  networkStatzSocket.on('subscribeToNetworkStatz', interval => {
    setInterval(() => {
      console.log('fock yeah: 🚀');
      networkStatzSocket.emit('networkStatz', networkStatz());
    }, interval);
  });
});

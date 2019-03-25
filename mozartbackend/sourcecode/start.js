const mongoose = require('mongoose');
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

const app = require('./app');

app.set('port', PORT);

app.listen(app.get('port'), () => {
  console.log('--------------------------------------------------');
  console.log(`🚀  Mozart_Backend API: listening on PORT ${PORT}!`);
  console.log('--------------------------------------------------\n');
});

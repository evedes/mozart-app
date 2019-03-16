const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const { PORT, DATABASE } = process.env;

// MONGOOSE CONNECTION TO MONGO
mongoose.Promise = global.Promise;

const connectWithRetry = () => {
  console.log('MongoDB connection with retry!');
  return mongoose.connect(DATABASE, { useNewUrlParser: true });
};

mongoose.connect(DATABASE, { useNewUrlParser: true });

mongoose.connection.on('error', err => {
  console.log(`MongoDB Connection Error: ${err}`);
  setTimeout(connectWithRetry, 5000);
});

mongoose.connection.on('connected', () => {
  console.log('--------------------------------------------------');
  console.log(`🚀  MongoDB is Connected...`);
  console.log('--------------------------------------------------\n');
});

// APP INITIALIZATION - STARTING SERVER... 🚀

const app = require('./app');

app.set('port', PORT || 3001);

app.listen(app.get('port'), () => {
  console.log('--------------------------------------------------');
  console.log(`🚀  Mozart_Backend API: listening on PORT ${PORT}!`);
  console.log('--------------------------------------------------\n');
});

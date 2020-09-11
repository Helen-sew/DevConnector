//to connect to MongoDB
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI'); // to get the value from default.json

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.log(err.message);
    //to end Node.js process by using process.exit([exitcode]) method. 1 means - Exit process with 'failure' code
    process.exit(1);
  }
};

module.exports = connectDB;

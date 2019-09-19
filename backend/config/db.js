//Import the mongoose module
const mongoose = require('mongoose');
const config = require('./index')
//Set up default mongoose connection
// export const dbPath = process.env.NODE_ENV == "production" ? 'mongodb://mongo/pmhealth' : 'mongodb://localhost/pmhealth'
// const dbPath = 'mongodb://127.0.0.1:27017/pmhealth';
// const dbPath = 'mongodb://mongo/pmhealth';
mongoose.connect(config.db_path);

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', function(err) {
	if(err) console.error('Mongodb connection error :', err);
});

db.once('open', function callback() {
	console.info('Mongodb connected successfully');
});

module.exports = db;
const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/employee-review-system-s`);

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error Connecting to DB'));

db.once('open',()=>{
    console.log('Connected to DB');
})


module.exports = db;

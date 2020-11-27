const mongoose = require('mongoose');

mongoose.connect((process.env.DB_URL) ? process.env.DB_URL : 'mongodb://localhost/db_blockchain', {useNewUrlParser:true});
mongoose.Promise = global.Promise;

module.exports = mongoose;
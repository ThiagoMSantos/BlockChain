const mongoose = require('mongoose');

const linkConnection = () =>{
  if(process.env.DB_URL != "")
    return process.env.DB_URL
  else
    return 'mongodb://localhost/db_blockchain'
}

mongoose.connect(linkConnection(), {useNewUrlParser:true});
mongoose.Promise = global.Promise;

module.exports = mongoose;
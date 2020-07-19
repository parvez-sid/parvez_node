var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.DB_CONN,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
    console.log("Successfully connected to the database");    
  }).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
var db = mongoose.connection;
module.exports = db;
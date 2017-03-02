console.log('Starting up the server');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 5000;

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended: true}));

var pg = require('pg');
var config = {
  database: 'phi', // the name of the database
  host: 'localhost', // where is your database
  port: 5432, // the port number for your database
  max: 10, // how many connections at one time
  idleTimeoutMillis: 30000 // 30 seconds to try to connect
};

var pool = new pg.Pool(config);

app.listen(port, function() {
  console.log('We are running on port: ', port);
});

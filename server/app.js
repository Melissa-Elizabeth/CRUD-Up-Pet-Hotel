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


app.post('/owner', function(req, res){
  var newOwner = req.body;
  pool.connect(function(err, client, done){
    if(err) {
      console.log('Error connecting to database: ', err);
      res.sendStatus(500);
    } else {
      client.query('INSERT INTO owner (first_name, last_name) VALUES ($1, $2);',
      [newOwner.first_name, newOwner.last_name],
      function(err, result){
        done();
        if(err) {
          console.log('Error making the database query: ', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
}); // end owner post

app.listen(port, function() {
  console.log('We are running on port: ', port);
});

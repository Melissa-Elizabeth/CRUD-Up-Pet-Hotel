console.log('Starting up the server');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 5000;
var path = require('path');

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

app.get('/petsTable', function(req, res){
  pool.connect(function(err, client, done){
    if(err) {
      // There was an error connecting to the database
      console.log('Error connecting to database: ', err);
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now, we're gonna' git stuff!!!!!
      client.query('SELECT owners.first_name, owners.last_name, pets.pet_name, visits.checkin, visits.checkout FROM owners FULL OUTER JOIN pets ON owners.id = pets.owners_id FULL OUTER JOIN visits ON visits.pets_id=pets.id;', function(err, result){
        done();
        if(err) {
          console.log('Error making the database query: ', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
        }
      });
    }
  });
});


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

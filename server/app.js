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


app.post('/pet/new', function(req, res){
  // This will be replaced with an INSERT statement to SQL
  var newPet = req.body;

  pool.connect(function(errorConnectingToDatabase, client, done){
    if(errorConnectingToDatabase) {
      // There was an error connecting to the database
      console.log('Error connecting to database: ', errorConnectingToDatabase);
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now, we're gonna' git stuff!!!!!
      client.query('INSERT INTO pets (pet_name, pet_breed, pet_color) VALUES ($1, $2, $3);',
      [newPet.petName, newPet.breed, newPet.color],
      function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Error making the database query: ', errorMakingQuery);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }//end else
      });
    }
  });
});


var pool = new pg.Pool(config);


app.post('/owner', function(req, res){
  var newOwner = req.body;
  console.log(newOwner);
  pool.connect(function(err, client, done){
    if(err) {
      console.log('Error connecting to database: ', err);
      res.sendStatus(500);
    } else {
      client.query('INSERT INTO owners (first_name, last_name) VALUES ($1, $2);',
      [newOwner.newOwnerFirstName, newOwner.newOwnerLastName],
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

app.get('/petsTable', function(req, res){
  pool.connect(function(err, client, done){
    if(err) {
      // There was an error connecting to the database
      console.log('Error connecting to database: ', err);
      res.sendStatus(500);
    } else {
      // We connected to the database!!!
      // Now, we're gonna' git stuff!!!!!
      client.query('SELECT owners.first_name, owners.last_name, pets.pet_name, pets.pet_breed, pets.pet_color, visits.checkin, visits.checkout FROM owners FULL OUTER JOIN pets ON owners.id = pets.owners_id FULL OUTER JOIN visits ON visits.pets_id=pets.id;', function(err, result){
        done();
        if(err) {
          console.log('Error making the database query: ', err);
          res.sendStatus(500);
        } else {
          res.send(result.rows);
          console.log(result.rows);
        }
      });
    }
  });
});

app.listen(port, function() {
  console.log('We are running on port: ', port);
});

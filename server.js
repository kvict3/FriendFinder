// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');


// Sets up the Express App
// =============================================================
var app = express(); // tells node we are creating an Express server
var PORT = process.env.PORT || 3000; // sets the port we will use



// Sets up the Express app to handle data parsing 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));



// Routes
// =============================================================
require('./app/routing/api-routes.js')(app);
require('./app/routing/html-routes.js')(app);

app.use(express.static('public'));



// Starts the server to begin listening 
// =============================================================
app.listen(PORT, function() {
	
	// console log to the terminal window to see if its working right
	console.log('App listening on PORT: ' + PORT);

});

var difference = function (a, b) { return Math.abs(a - b) }
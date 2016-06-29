// A GET route with the url /api/friends. This will be used to display a JSON of all possible friends
// A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

// API Routes
// =============================================================

// First, load the data from friends.js
var list = require('../data/friends.js');
var bodyParser = require('body-parser');
var path = require('path');


// Creating Routes
module.exports = function(app) {

	// Search for Specific Character (or all characters) - provides JSON
	app.get('/api/friends', function(req, res){
		res.status(200).json({message: 'connected.'})
		res.json(list);
	});

	// Create New Characters - takes in JSON input
	app.post('/api/friends', function(req, res){


		//functions to return best match
		var match = {
			'name': 'none',
			'photo': 'none'
		};

		function sum (array) {
			var total = 0;
			for (var n = 0; n < array.length; n++) {
				total += parseInt(array[n]);
			}
			return total;
		}

		var collected = sum(req.body.scores);


		console.log(collected);

		var friendTotal = 0;

		for (var i = 0; i < list.length; i++) {
			friendTotal = sum(list[i].scores);
			
			if (friendTotal == collected) {
				match.name = list[i].name;
				match.photo = list[i].photo;
			}
		};

		if (match.name == 'none') {
			var closest = 50;

			for (var i = 0; i < list.length; i++) {
				friendTotal = sum(list[i].scores);
				var difference = Math.abs(friendTotal - collected);
				if ( difference <= closest ){
					closest = difference;
					match.name = list[i].name;
					match.photo = list[i].photo;
				};
			};
		};
		console.log(match);
		res.json(match);

	});

};
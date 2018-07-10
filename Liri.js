require("dotenv").config();
// to pull request for OMDB
var request = require("request");

var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
//console.log(keys); 

// key for OMDB
request("http://www.omdbapi.com/?t=Mr+Nobody&y=&plot=short&apikey=trilogy", function (error, response, body) { 

    if (!error && response.statusCode === 200) {
        var filmBody = JSON.parse(body);
        console.log(filmBody);
        console.log("Movie Title: " + filmBody.Title);
        console.log("Year of Release: " + filmBody.Year);
        console.log("Rating: " + filmBody.imdbRating);
        console.log("Rotten: " + filmBody.Ratings[1].Value);
        console.log("Country: " + filmBody.Country);
        console.log("Language: " + filmBody.Language);
        console.log("Plot: " + filmBody.Plot);
        console.log("Actors: " + filmBody.Actors);
    }
});


require("dotenv").config();
// to pull request for OMDB
var request = require("request");

var keys = require("./keys.js");
var Twitter = require("twitter");
var client = new Twitter(keys.twitter);
var userInput = process.argv[2];
var fs = require("fs");
var params = { screen_name: userInput };

var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
console.log(keys); 

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

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            var tweetFrom = "\nTweets from: @" + tweets[0].user.screen_name;
            console.log(tweetFrom);
            fs.appendFile("saved-tweets.txt", tweetFrom, function (err) {
                if (err) {
                    return console.log(err);
                }
                for (var i = 0; i < tweets.length; i++) {
                    var twitterResponse = "\n---------\n" + "Tweet: " + tweets[i].text + "\nDate of Tweet " + tweets[i].created_at;
                    console.log(twitterResponse);
                    fs.appendFile("saved-tweets.txt", twitterResponse, function (err) {
                        if (err) {
                            return console.log(err);
                        }
                    });
                }
            });
        }
    });




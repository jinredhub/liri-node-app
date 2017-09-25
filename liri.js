
// spotify dev. you need these to use npm node-spotify-api
// client id 2c4d0610c6bf4949b28f722bc92848f7
// client secret fe9b91861db543b09832aece6cf3570a

var twitterKeys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
// choose command
var arg1 = process.argv[2];
//song name or movie name
var arg2 = process.argv[3];

if (arg1 === "my-tweets"){

	var client = new Twitter(
		twitterKeys
	);
	var params = {screen_name: 'Mike Red'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	   	for (var i=0; i<tweets.length; i++){
	   		console.log("tweet"+i+": ", tweets[i].text);
	   }
	  }
	});
}
else if (arg1 === "spotify-this-song"){
	// Artist(s)
	// The song's name
	// A preview link of the song from Spotify
	// The album that the song is from
	// * if user didn't provide song, output "The Sign" by Ace of Base
	if (arg2 === undefined){
		arg2 = "the sign ace of base";
	}
	var spotify = new Spotify({
	  id: "2c4d0610c6bf4949b28f722bc92848f7",
	  secret: "fe9b91861db543b09832aece6cf3570a"
	});
	 
	spotify.search({ type: 'track', query: arg2, limit: 1}, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	 
	// console.log(JSON.stringify(data, null, 2)); 
	console.log("Artist: ", data.tracks.items[0].album.artists[0].name);
	console.log("Name of song: ", data.tracks.items[0].name);
	console.log("Preview link of song: ", data.tracks.items[0].preview_url);
	console.log("Album: ", data.tracks.items[0].album.name);
	});
}
else if (arg1 === "movie-this"){
	// Title of the movie.
	// Year the movie came out.
	// IMDB Rating of the movie.
	// Rotten Tomatoes Rating of the movie.
	// Country where the movie was produced.
	// Language of the movie.
	// Plot of the movie.
	// Actors in the movie.
	// * if user doesn't type movie in, output data for movie "Mr. Nobody"
	// * you may use OMDB api key 40e9cece
	console.log("else if : movie-this");
	var queryURL = "http://www.omdbapi.com/?apikey=40e9cece&t=" + arg2;
	
	request(queryURL, function(err, response, body){
		// console.log(body);
		console.log(JSON.parse(body).Title);
		console.log(JSON.parse(body).Year);
		console.log(JSON.parse(body).imdbRating);
		console.log(JSON.parse(body).Ratings[0].Value);
		console.log(JSON.parse(body).Language);
		console.log(JSON.parse(body).Country);
		console.log(JSON.parse(body).Plot);
		console.log(JSON.parse(body).Actors);


	});
}
else if (arg1 === "do-what-it-says"){
	// use fs to read random.txt file
	// then run spotify-this-song from random.txt file
	var fs = require("fs");
	fs.readFile("random.txt", "utf-8", function(err, data){
		if (err){
			console.log(err);
		}
		else{
			console.log(data);
			var words = data.split(",");
			// words.shift();
			console.log(words);


			var spotify = new Spotify({
			  id: "2c4d0610c6bf4949b28f722bc92848f7",
			  secret: "fe9b91861db543b09832aece6cf3570a"
			});
			 
			spotify.search({ type: 'track', query: words[1], limit: 1}, function(err, data) {
			  if (err) {
			    return console.log('Error occurred: ' + err);
			  }
			 
			// console.log(JSON.stringify(data, null, 2)); 
			console.log("Artist: ", data.tracks.items[0].album.artists[0].name);
			console.log("Name of song: ", data.tracks.items[0].name);
			console.log("Preview link of song: ", data.tracks.items[0].preview_url);
			console.log("Album: ", data.tracks.items[0].album.name);
			});
		}
	})
}
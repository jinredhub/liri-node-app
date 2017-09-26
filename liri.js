
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

// user command start here
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
	// see if user provide name of song. If not, default to "the sign"
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
	
	// check if user provide name of movie. if not, default to "Mr. Nobody"
	if (arg2 === undefined){
		arg2 = "Mr. Nobody";
	}
	var queryURL = "http://www.omdbapi.com/?apikey=40e9cece&t=" + arg2;
	
	request(queryURL, function(err, response, body){
		console.log("Title: ", JSON.parse(body).Title);
		console.log("Year came out: ", JSON.parse(body).Year);
		console.log("IMDB rating: ", JSON.parse(body).imdbRating);
		console.log("Rotten Tomatoes rating: ", JSON.parse(body).Ratings[0].Value);
		console.log("Country produced: ", JSON.parse(body).Country);
		console.log("Language: ", JSON.parse(body).Language);
		console.log("Plot: ", JSON.parse(body).Plot);
		console.log("Actors: ", JSON.parse(body).Actors);
	});
}
else if (arg1 === "do-what-it-says"){
	// use fs to read random.txt file
	// then run spotify-this-song, get name of song from random.txt file
	var fs = require("fs");
	fs.readFile("random.txt", "utf-8", function(err, data){
		if (err){
			console.log(err);
		}
		else{
			// console.log(data);
			var words = data.split(",");
			// console.log(words);

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
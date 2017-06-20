var mongoose = require("mongoose");
var URL = 'mongodb://localhost:27017/rest_api';

var Movie = require("../models/movies.model");
var User = require("../models/users.model");

module.exports = {
  showIndex: showIndex,
  getMovies: getMovies,
  postMovies: postMovies,
  delMovies: delMovies
};

// Index
function showIndex(req, res){
  res.render('movies');
}

// GET Movies
function getMovies(req, res){
  mongoose.connect(URL);
  Movie.find({}, function(err, movies){
    if (err) return console.error(err);
    res.send(movies)
  })
}

// POST Movies
function postMovies(req, res){
  if (!req.get('Authorization')) {
    res.send({
      error: 401,
      message: "Required Authorization code"
    })
  } else {
    var token = req.get('Authorization');
    var token_arr = token.split(".");
    var user = new Buffer(token_arr[0], 'base64').toString("ascii");
    var signature = token_arr[1];
    var response = validateUser(user, signature)
    res.send("response: "+response)
  }
}

function validateUser(user, signature){
  var message = null;
  if (testJSON(user)) {
    message = "VALID JSON TOKEN";
    var find_user = JSON.parse(user).user;
    mongoose.connect(URL);
    User.find({user: find_user}, function(err, result){
      if (result[0] == null) {
        message = "Invalid user"
        return message;
      }else{
        message = "User found"
        return message;
      }
    });
  }else{
    message = "NOT VALID JSON TOKEN";
  }
}

// DELETE Movies
function delMovies(req, res){
  let movie_id = req.params.movieID;
  Movie.findByIdAndRemove(movie_id, function(err, movie){
    res.send({
      message: "Movie DELETED",
      item: movie
    });
  });
}

function testJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

var mongoose = require("mongoose");
var URL = 'mongodb://localhost:27017/rest_api';

var Movie = require("../models/movies.model");
var User = require("../models/users.model");

module.exports = {
  showIndex: showIndex,
  getMovies: getMovies,
  getMovieById: getMovieById,
  postMovies: postMovies,
  delMovies: delMovies
};

// Index
function showIndex(req, res){
  mongoose.connect(URL);
  Movie.find({}, function(err, movies){
    if (err) return console.error(err);
    res.render('movies', {movies: movies})
  })
}

// GET - All Movies
function getMovies(req, res){
  mongoose.connect(URL);
  Movie.find({}, function(err, movies){
    if (err) return console.error(err);
    res.json(movies)
  })
}

// GET - Movie By Id
function getMovieById(req, res){
  let data = req.params.movieID;
  mongoose.connect(URL);
  Movie.find({"_id": data}, function(err, movie){
    if (err) return console.error(err);
    res.json(movie)
  })
}

// POST - Movies
function postMovies(req, res){
  var data = {
    "title": req.body.fld_title,
    "poster": req.body.fld_poster,
    "trailer": req.body.fld_trailer
  };

  var token = req.get('Authorization');
  validateUserAnd(token, res, data, createMovie);
}

// DELETE - Movies
function delMovies(req, res){
  let data = req.params.movieID;
  var token = req.get('Authorization');
  validateUserAnd(token, res, data, removeMovie);
}

// Authenicate User and then do some action
function validateUserAnd(token, response, data, callback){
  if (token == undefined) {
    response.json({code: 401, message: "Required Authorization token"})
  }
  var token_arr = token.split(".");
  var user = new Buffer(token_arr[0], 'base64').toString("ascii");
  var signature = token_arr[1];
  if (testJSON(user)) {
    var find_user = JSON.parse(user).user;
    mongoose.connect(URL);
    User.find({user: find_user}, function(err, result){
      if (result[0] == null) {
        response.json({code: 401, message: "User not found"})
      }else{
        callback(data, response)
      }
    });
  }else{
    response.json({code: 401, message: "Invalid JSON token"})
  }
}

// Create a new movie in database
function createMovie(data, response){
  Movie.create(data, function (err, item) {
  if (err){
    response.json({code: 200,message: err.message})
  }else{
    response.json({code: 200,message: "Movie created"})
  }
})
}

// Delete a movie from database
function removeMovie(data, response){
  let movie_id = data;
  Movie.findByIdAndRemove(movie_id, function(err, movie){
    response.json({
      message: "Movie DELETED",
      item: movie
    });
  });
}

// Test if data is avalid JSON
function testJSON(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

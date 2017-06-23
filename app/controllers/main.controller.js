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
  mongoose.connect(URL);
  Movie.find({}, function(err, movies){
    if (err) return console.error(err);
    res.render('movies', {movies: movies})
  })
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
      code: 401,
      message: "Required Authorization token"
    })
  } else {
    var data = {
      "title": req.body.fld_title,
      "poster": req.body.fld_poster,
      "trailer": req.body.fld_trailer
    };
    var token = req.get('Authorization');
    validateUser(token, res, data, createMovie);
  }
}

function validateUser(token, response, data, callback){
  var token_arr = token.split(".");
  var user = new Buffer(token_arr[0], 'base64').toString("ascii");
  var signature = token_arr[1];
  if (testJSON(user)) {
    var find_user = JSON.parse(user).user;
    mongoose.connect(URL);
    User.find({user: find_user}, function(err, result){
      if (result[0] == null) {
        response.send({code: 401, message: "User not found"})
      }else{
        callback(data, response)
      }
    });
  }else{
    response.send({code: 401, message: "Invalid JSON token"})
  }
}

function createMovie(data, response){
  Movie.create(data, function (err, item) {
  if (err) return handleError(err);
  response.send({code: 200,message: "Movie created"})
})
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

var mongoose = require("mongoose");
var URL = 'mongodb://localhost:27017/rest_api';

var Movie = require("../models/movies.model");

module.exports = {
  showIndex: showIndex,
  getMovies: getMovies,
  postMovies: postMovies,
  delMovies: delMovies
};

// Index
function showIndex(req, res){
  res.send("INDEX PAGE")
}

// GET Movies
function getMovies(req, res){
  mongoose.connect(URL);
  Movie.find({}, function(err, movies){
    if (err) return console.error(err);
    res.render('movies', {movies: movies})
  })
}

// POST Movies
function postMovies(req, res){
  mongoose.connect(URL);

  res.setHeader('Content-Type', 'application/json');
  let title = req.body.fld_title;
  let poster = req.body.fld_poster;
  let trailer = req.body.fld_trailer;

  movie_object = {
    title: title,
    poster: poster,
    trailer: trailer
  };

  var newMovie = new Movie(movie_object);
  res.send(movie_object)
  newMovie.save(function (err){
    if (err) {
      console.log(err);
    } else {
      // res.send(req.body)
    }
  });
}

// DELETE Movies
function delMovies(req, res){
  let movie_id = req.params.movieID;
  Movie.findByIdAndRemove(movie_id, function(err, movie){
    res.redirect(301, ' ');
  });
}

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var moviesSchema = new Schema({
  title: String,
  poster: String,
  trailer: String
});

var Movies = mongoose.model("Movies", moviesSchema);

module.exports = Movies;

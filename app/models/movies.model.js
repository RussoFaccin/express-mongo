var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var moviesSchema = new Schema({
  title: {type: String, required: true, max: 100},
  poster: {type: String, required: true, max: 100},
  trailer: {type: String, required: true, max: 100}
});

var Movies = mongoose.model("Movies", moviesSchema);

module.exports = Movies;

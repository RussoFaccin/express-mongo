var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  user: {type: String, required: true, max: 100},
  signature: {type: String, required: true, max: 100}
});

var Users = mongoose.model("Users", userSchema);

module.exports = Users;

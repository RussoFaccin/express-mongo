var express = require("express");
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;

var app = express();

// Define  view template - Pug
app.set('views', './app/views')
app.set('view engine', 'pug')

app.use(express.static('app/public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// set routes
app.use(require('./app/routes'));

app.listen(port);

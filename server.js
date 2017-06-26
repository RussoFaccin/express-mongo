var express = require("express");
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000;
var routes = require('./app/routes')

var app = express();

// Define  view template - Pug
app.set('views', './app/views')
app.set('view engine', 'pug')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())

// Serve static files
app.use(express.static('app/public'))

app.listen(port);

// set routes
app.use('/api', routes);

var express = require("express");
var router = express.Router();
var mainController = require("./controllers/main.controller");

// Index route
router.get("/", mainController.showIndex)

// Movies route - GET
router.get("/movies", mainController.getMovies)

// Movies route - POST
router.post("/movies", mainController.postMovies)

// Movies route - DELETE
router.delete("/movies/:movieID", mainController.delMovies)

// export the router
module.exports = router;

const { Router } = require("express");
const router = Router();
const { getVideoGame } = require("../controllers/videogame.controllers");
const { createVideogame } = require("../controllers/videogame.controllers");
const {getVideogameById} = require('../controllers/videogame.controllers')


//createVideogame
router.get("/", getVideoGame);
router.post("/", createVideogame);
router.get("/", getVideogameById);




module.exports = router;

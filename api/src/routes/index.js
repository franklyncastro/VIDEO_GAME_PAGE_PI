const { Router } = require("express");
const express = require("express");
// Importar todos los routers;
const genresRoutes = require("./genres.routes");
const gamesRoutes = require("./games.routes");

const router = Router();
router.use(express.json());

// Configurar los routers
router.use("/videogames", gamesRoutes);
router.use("/genres", genresRoutes);

module.exports = router;

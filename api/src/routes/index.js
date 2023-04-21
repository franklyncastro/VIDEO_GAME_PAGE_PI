const { Router } = require('express');
const express = require("express");
// Importar todos los routers;
const genres = require('./genresRoute')
const videogames = require('./videoGamesRoutes')
const users = require('./usersRoutes')
const platforms = require('./platformsRoute')
const images = require('./imagesRoute')

const router = Router();
router.use(express.json());

// Configurar los routers
router.use('/genres', genres)
router.use('/videogames', videogames)
router.use('/users',users)
router.use('/platforms', platforms)
router.use('/images', images)

module.exports = router;

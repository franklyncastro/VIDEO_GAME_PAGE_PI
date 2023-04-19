const { Router } = require('express');
const router = Router();
const PlatformRoutes = require('./Platforms.routes.js')
const VideoGameRoutes = require('./VideoGame.routes.js')
const GenreRoutes = require('./Genre.routes.js')




// Configurar los routers
router.use('/platforms', PlatformRoutes)
router.use('/videogames', VideoGameRoutes)
router.use('/genres', GenreRoutes)


module.exports = router;

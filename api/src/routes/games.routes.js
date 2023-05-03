const { Router } = require("express");
const gamesRouter = Router();

//todo => Que es Multer?
//? Multer es un middleware de node.js 
//? para el manejo multipart/form-data, 
//? que se usa principalmente para cargar archivos.

const multer = require('multer')
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

//? Aqui se guardan las imagenes cargadas a la DB aun no implementado

const upload = multer({ storage: storage }); 

const {
  getVideoGamesHandler,
  getVideoGamesbyIDHandler,
  getVideoGamesbyNameHandler,
  CreateVideoGameHandler,
} = require("../handlers/videoGamesHandlers");

gamesRouter.get("/", getVideoGamesHandler);
gamesRouter.post("/", upload.single("image"), CreateVideoGameHandler);
gamesRouter.get("/name/", getVideoGamesbyNameHandler);
gamesRouter.get("/:idVideogame", getVideoGamesbyIDHandler);

module.exports = gamesRouter;


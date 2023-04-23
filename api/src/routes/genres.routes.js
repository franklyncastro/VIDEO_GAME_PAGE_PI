const { Router } = require("express");

const genreRoutes = Router();

const {
  getGenresHandler,
  getGenresLoadHandler,
} = require("../handlers/genresHandlers");

genreRoutes.get("/", getGenresHandler);
genreRoutes.get("/load/", getGenresLoadHandler);

module.exports = genreRoutes;

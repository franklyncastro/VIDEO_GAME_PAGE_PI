const express = require("express");
const getAllGenres = require("../controllers/getAllGenres");


const genresRouter = express.Router();

genresRouter
  .get("/", async (req, res) => {
    try {
      res.send(await getAllGenres());
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  });

module.exports = genresRouter;
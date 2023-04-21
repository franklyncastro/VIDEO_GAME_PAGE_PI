const express = require("express");
const getAllPlatforms = require("../controllers/getAllPlatforms");

const platformsRouter = express.Router();

platformsRouter.get("/", async (req, res) => {
    try {
      res.send(await getAllPlatforms());
    } catch (error) {
      console.log(error)
      res.status(500).send(error)
    }
  });

module.exports = platformsRouter;
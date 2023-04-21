const express = require("express");
const getApiVideogames = require("../controllers/getApiVideogame");
const getDBVideogames = require("../controllers/getDBVideogames");
const getGameBySearch = require("../controllers/getGameBySearch")
const getAllVideogames = require("../controllers/getAllVideogames")
const postCustomVideogame = require("../controllers/postCustomVideogame")
const getGameDetail = require("../controllers/getGameDetail")
const videogamesRouter = express.Router();

videogamesRouter.get("/", async (req, res) => {
    const { name } = req.query;
      if (name) {
        try {
        const data = await getGameBySearch(name);
        res.status(200).send(data);
        } catch (error) {
          console.log(error)
          res.status(404).send(error);
        }
      } else {
        try {
          const data = await getAllVideogames();
          res.status(200).send(data);
        } catch (error) {
          res.status(500).send(error)
        }
      }

  })

videogamesRouter.get("/db", async(req, res)=>{
  try {
    const data = await getDBVideogames()
    res.status(200).send(data)
  } catch (error) {
    res.status(500).send(error)
  }
})

videogamesRouter.get("/api",async(req, res)=>{
  try {
    const data = await getApiVideogames()
    res.status(200).send(data)
  } catch (error) {
    res.status(500).send(error)
  }
})


videogamesRouter.get("/:id", async (req, res) => {
    const { id } = req.params;  
    try {
      const findGame = await getGameDetail(id)
      res.status(200).send(findGame);
    } catch (error) {
      console.log(error)
      res.status(400).send(error);
    }
  })

  videogamesRouter.post("/", async (req, res) => {
    try {
      const gameCreationForm = req.body;

      const newGame = await postCustomVideogame(gameCreationForm);
      res.status(201).send(newGame);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
  

module.exports = videogamesRouter;
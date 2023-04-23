const {
  getApiGames,
  getGameDB,
  getAllGames,
  getGamesByID,
  getGameByName,
  createVideoGame,
  getGameNameByDB,
  getAllGameByName,
} = require("../controllers/vgames.controllers");

const getVideoGamesHandler = async (req, res) => {
  try {
    const api = await getApiGames();
    const db = await getGameDB();
    const results = getAllGames(db, api);
    res.status(200).json(results);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getVideoGamesbyIDHandler = async (req, res) => {
  const { idVideogame } = req.params;
  // si no se recibe id por params se ejecuta getvideogamehandlers
  try {
    const type = isNaN(idVideogame) ? "db" : "api";
    const results = await getGamesByID(idVideogame, type);
    res.status(200).json(results);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getVideoGamesbyNameHandler = async (req, res) => {
  const { name } = req.query;
  console.log(`Nombre del juego que se esta buscando ${name}`)

  try {
    if (!name) res.status(200).send("El Campo nombre no puede estar vacio");
    const api = await getGameByName(name);
    const db = await getGameNameByDB(name);
    const results = getAllGameByName(api, db);
   

    if (results.error) {
      res.status(200).send(results.error);
    } else {
      res.status(200).json(results);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const CreateVideoGameHandler = async (req, res) => {
  try {
    const {
      name,
      description,
      platforms,
      image,
      date,
      rating,
      SearchGenre,
    } = req.body;
    //
    const searchG = SearchGenre.split(",");

    console.log(req.file);
    let results = await createVideoGame(
      name,
      description,
      platforms,
      date,
      rating,
      req.file.filename,
      searchG
    );
    res.status(200).json(results);
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      // console.log(JSON.stringify(error))
      let ARR_Error = [];
      error.errors.forEach((element) => {
        let Obj = {
          [element.path]: element.message,
        };
        ARR_Error.push(Obj);
      });
      res.status(200).json(ARR_Error);
    } else {
      console.log(error);
      res.status(400).send(error.message);
    }
  }
};

module.exports = {
  getVideoGamesHandler,
  getVideoGamesbyIDHandler,
  getVideoGamesbyNameHandler,
  CreateVideoGameHandler,
};

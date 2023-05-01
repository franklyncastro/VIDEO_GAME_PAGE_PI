const {
  getApiGames,
  getGameDB,
  getAllGames,
  getGamesByID,
  getGameByName,
  createVideoGameDataBase,
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
      date,
      rating,
      searchGenres,
      image, // Agregamos la URL de la imagen al objeto de datos
    } = req.body;

    const searchGenre = searchGenres.split(",");

    const response = await createVideoGameDataBase(
      name,
      description,
      platforms,
      image, // Pasamos la URL de la imagen como argumento adicional
      date,
      rating,
      searchGenre
    );
    res.status(200).json(response);
  } catch (err) {
    if (err.name === "SequelizeValidationerr") {
      const arrayErrors = [];
      err.errors.forEach((element) => {
        const Obj = {
          [element.path]: element.message,
        };
        arrayErrors.push(Obj);
      });
      res.status(200).json(arrayErrors);
    } else {
      console.log(err);
      res.status(400).send(err.message);
    }
  }
};

module.exports = {
  getVideoGamesHandler,
  getVideoGamesbyIDHandler,
  getVideoGamesbyNameHandler,
  CreateVideoGameHandler,
};

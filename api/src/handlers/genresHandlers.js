const {
  loadGenres,
  getGenres,
} = require("../controllers/genres.controllers");


const getGenresLoadHandler = async (req, res) => {
  //todo => Nombres de la DB
  try {
    const results = await loadGenres();
    res.status(200).json(results);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getGenresHandler = async (req, res) => {
  //todo => Se solicita la info a la api para cargarlos a la DB
  try {
    const results = await getGenres();
    res.status(200).json(results);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getGenresHandler,
  getGenresLoadHandler,
};

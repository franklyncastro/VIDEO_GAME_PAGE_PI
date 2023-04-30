const axios = require("axios");
require("dotenv").config();

const { API_KEY } = process.env;

const { Genres } = require("../db");


const getApiGenres = async () => {
  return await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`)
};


const getAllGenres = async () => {
  console.log("Obtener Generos de la API");
  let dataApi = getApiGenres();
  return dataApi.then((genre) => {
    return genre.data.results.map((genre) => {
      return {
        id: genre.id,
        name: genre.name,
      };
    });
  });
};

const getGenres = async () => {
  let allGenres = await getAllGenres();
  await Genres.bulkCreate(allGenres);
  return allGenres;
};

const GenreSeach = async (genre) => {
  return await Genres.findOne({ where: { name: genre } });
};

const loadGenres = async () => {
  const genresDB = await Genres.findAll({
    attributes: ["name"],
  });

  return genresDB;
};

module.exports = {
  getGenres,
  GenreSeach,
  loadGenres,
};

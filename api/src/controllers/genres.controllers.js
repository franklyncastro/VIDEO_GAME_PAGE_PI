const axios = require("axios");
require("dotenv").config();

const { API_KEY } = process.env;

const { Genres } = require("../db");


const getApiGenres = async () => {
  try {
    const response = await axios(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener los géneros de la API: ${error.message}`);
    return [];
  }
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

const searchGenres = async (genre) => {
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
  searchGenres,
  loadGenres,
};

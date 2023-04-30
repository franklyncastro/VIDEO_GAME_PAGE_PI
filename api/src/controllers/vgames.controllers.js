const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

// Modelos de la DB
const { Videogame, Genres } = require("../db");
const { Op } = require("sequelize");

const { GenreSeach } = require("./genres.controllers");


const gameObject = (
  id,
  name,
  description,
  platforms,
  image,
  date,
  rating,
  Genres
) => {
  return {
    id: id,
    name: name,
    description: description,
    platforms: platforms,
    image: image,
    date: date,
    rating: rating,
    genres: Genres,
  };
};

const getApiGames = async () => {
  let i = 1;
  let ARR_Promis = [];
  let ARR_res = [];
  let ARR_datos = [];
  while (i < 6) {
    let PromApi = await axios(
      `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
    );

    ARR_Promis.push(PromApi);
    i++;
  }

  ARR_res = (await Promise.all(ARR_Promis)).map((PromIndi) => {
    return PromIndi.data.results.map((data) => {
      return {
        id: data.id,
        image: data.background_image,
        name: data.name,
        genres: data.genres,
      };
    });
  });

  ARR_res.map((data) => {
    ARR_datos = ARR_datos.concat(data);
  });

  return ARR_datos;
};

const getGameDB = async () => {
  const getGameDB = await Videogame.findAll({
    include: {
      model: Genres,
      attributes: [["name", "name"]],
      through: { attributes: [] },
    },
    attributes: ["id", "name", ["image", "image"]],
  });
  return getGameDB;
};

const getAllGames = (db, api) => {
  console.log(`"Todos los juegos vgames.controllers.js"`);
  if (db.length > 0 && api.length > 0) {
    console.log("todos");
    return [...db, ...api];
  } else {
    if (db.length > 0) {
      return db;
    }
    return api;
  }
};

const getGamesByApi = async (id) => {
  return await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
};

const getGamesByID = async (id, type) => {
  if (type === "api") {
    let PromApi = getGamesByApi(id);
    return PromApi.then((game) => {
      return (obj = gameObject(
        game.data.id,
        game.data.name,
        game.data.description,
        game.data.platforms,
        game.data.background_image,
        game.data.released,
        game.data.ratings,
        game.data.genres
      ));
    });
  } else {
    let videoGameDB = await Videogame.findByPk(id, {
      include: {
        model: Genres,
        attributes: ["name"],
        through: { attributes: [] },
      },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!videoGameDB) return { error: `No hay resultados con el ID: ${id}` };
    return gameObject(
      videoGameDB.id,
      videoGameDB.name,
      videoGameDB.description,
      videoGameDB.platforms,
      videoGameDB.image,
      videoGameDB.date,
      videoGameDB.rating,
      videoGameDB.genres
    );
  }
};

const getGameNameByDB = async (name) => {
  console.log(name);

  const searchGameDB = await Videogame.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: {
      model: Genres,
      attributes: ["name"],
      through: { attributes: [] },
    },
    attributes: [
      "id",
      "name",
      "platforms",
      ["image", "image"],
      "date",
      "rating",
    ],
  });
  if (searchGameDB.length >= 16) {
    return searchGameDB.slice(0, 15);
  }
  if (searchGameDB.length === 0) {
    return { error: `No se encontraron resultados con: ${name}` };
  }

  return searchGameDB;
};

const getGameByName = async (name) => {
  let PromApi = getGameByNameAPI(name);
  return PromApi.then((search) => {
    if (search.data.results.length >= 16) {
      return search.data.results.slice(0, 15);
    } else {
      if (search.data.results.length == 0) {
        return { error: `No se encontraro resultados con: ${name}` };
      }
      return search.data.results;
    }
  });
};

const getAllGameByName = (api, db) => {
  if (db.length > 0 && api.length > 0) {
    let st = api.map((data) => {
      return gameObject(
        data.id,
        data.name,
        "",
        data.platforms,
        data.background_image,
        data.released,
        data.rating,
        data.genres
      );
    });

    let total = [...db, ...st];
    if (total.length >= 16) {
      return total.slice(0, 15);
    }
    return total;
  } else {
    if (db.length > 0) {
      return db;
    } else {
      if (api.error) return api.error;
      return api.map((data) => {
        return gameObject(
          data.id,
          data.name,
          "",
          data.platforms,
          data.background_image,
          data.released,
          data.rating,
          data.genres
        );
      });
    }
  }
};

const getGameByNameAPI = async (name) => {
  console.log("Ingresar el Nombre");
  return await axios(
    `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
  );
};

const createVideoGameDataBase = async (
  name,
  description,
  platforms,
  image,
  date,
  rating,
  searchGenres
) => {
  
  const [videoGame, created] = await Videogame.findOrCreate({
    where: { name },
    defaults: {
      name,
      description,
      platforms,
      image,
      date,
      rating,
    },
  });
  if (!created)
    return {
      error: "No se puede crear, dado que ya existe el nombre: " + Nombre,
    };
  let i = 0;
  // obtengo el array con los generos y creo las relaciones
  while (searchGenres.length > i) {
    const Genre = await GenreSeach(searchGenres[i]);
    await Genre.addVideogame(videoGame);
    i++;
  }
  return { ok: "Se creo correctamente" };
};

module.exports = {
  getApiGames,
  getGameDB,
  getAllGames,
  getGamesByID,
  getGameByName,
  getGameNameByDB,
  getAllGameByName,
  createVideoGameDataBase,
};

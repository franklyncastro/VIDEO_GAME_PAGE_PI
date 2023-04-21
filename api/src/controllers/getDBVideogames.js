const { Videogame, Genre } = require("../db");

const getDBVideogames = async () => {
    const customGames = await Videogame.findAll({
        include: Genre
      });
      return customGames;
}


module.exports = getDBVideogames;
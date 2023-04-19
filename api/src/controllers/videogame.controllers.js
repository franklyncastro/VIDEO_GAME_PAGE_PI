const { Sequelize } = require("sequelize");
const { Videogame } = require("../db.js");

const getVideoGame = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) {
      const allGame = await Videogame.findAll();
      res.status(200).json(allGame);
    } else {
      const getByNameGame = await Videogame.findAll({
        where: {
          name: {
            //sirver para buscar en minusculas y mayusculas
            [Sequelize.Op.iLike]: `%${name}%`,
          },
        },
      });

      res.status(200).json(getByNameGame);
    }
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const createVideogame = async (req, res) => {
  try {
    const { name, image, platforms, description, date, rating, genres } =
      req.body;

    const newGame = await Videogame.create({
      name,
      image,
      platforms,
      description,
      date,
      rating,
      genres,
    });

    res.status(200).json(newGame);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = { getVideoGame, createVideogame };

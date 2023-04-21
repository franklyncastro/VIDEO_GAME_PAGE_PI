require('dotenv').config()

const axios = require("axios").default;
const { Op } = require("sequelize");
const { Videogame, Genre } = require("../db");

const { API_KEY } = process.env;

const getGameBySearch = async (search) => {
  const res = await axios.get(`https://api.rawg.io/api/games?search=${search}&key=${API_KEY}`, {
    headers: {
      "Accept-Encoding": "null",
    },    
  });
  const apiGames = res.data.results.map(each=>{
    return {
      id: each.id,
      name: each.name,
      released: each.released,
      rating: each.rating,
      image:each.short_screenshots,
      platform:each.parent_platforms,
      genres: each.genres.map(genre=>{
       return {name:genre.name,
                id: genre.id} 
      })
    }
  })
  const customGames = await Videogame.findAll({
    where: {
      name: {
        [Op.iLike]: `%${search}`,
      },
    },
    include: Genre
  });
  if (!apiGames.length && !customGames.length) {  throw  'Not Found'  }
  return [...customGames, ...apiGames]
};
module.exports = getGameBySearch;
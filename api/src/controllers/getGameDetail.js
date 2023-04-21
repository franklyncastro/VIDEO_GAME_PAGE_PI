require('dotenv').config()

const axios = require("axios").default;
const { Videogame, Genre } = require("../db");

const { API_KEY } = process.env;

const getGameDetail = async (id) => {
  const numericId = !isNaN(+id)
  if (numericId) {
    const fetchedGame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`, {
      headers: {
        "Accept-Encoding": "null",
      },    
    });
    return  {
          id: fetchedGame.data.id,
          name: fetchedGame.data.name,
          released: fetchedGame.data.released,
          rating: fetchedGame.data.rating,
          image:fetchedGame.data.background_image,
          image2: fetchedGame.data.background_image_additional,
          webpage: fetchedGame.data.website,
          platform:fetchedGame.data.parent_platforms,
          summary: fetchedGame.data.description_raw,
          genres: fetchedGame.data.genres.map(genre=>{
           return {name:genre.name,
                    id: genre.id} 
          }),
          tags: fetchedGame.data.tags.map(tag=>{
            return{name:tag.name}
          })
        }
      };
  
  const detail = await Videogame.findOne({
    where: { id },
    include: Genre
  });
  if (!detail) throw { message: "Not Found!" };
  return detail;
};

module.exports = getGameDetail;
require('dotenv').config()
const axios = require("axios").default;
const { API_KEY } = process.env;

const getApiVideogames = async()=>{
    let apiGames = [];
  let apiUrl = `https://api.rawg.io/api/games?key=${API_KEY}`;

  let i = 0;
  while (i < 5) {
    const res = await axios.get(apiUrl, {
      headers: {
        "Accept-Encoding": "null",
      },    
    });
    const { data } = res;
    apiGames = apiGames.concat(data.results.map(each=>{
      return {
        id: each.id,
        name: each.name,
        released: each.realised,
        rating: each.rating,
        image:each.short_screenshots,
        platform:each.parent_platforms,
        genres: each.genres.map(genre=>{
         return {name:genre.name,
                  id: genre.id} 
        })
      }
    }))
    apiUrl = data.next;
    i++;
  }
  return apiGames;
}

module.exports = getApiVideogames;
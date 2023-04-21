const getApiVideogames = require('../controllers/getApiVideogame');
const getDBVideogames = require('../controllers/getDBVideogames');




const getVideogames = async () => {

  const customGames = await getDBVideogames()
  const apiGames = await getApiVideogames()

  return apiGames.concat(customGames)
};
module.exports = getVideogames;
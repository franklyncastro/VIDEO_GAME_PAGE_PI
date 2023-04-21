const { Videogame } = require('../db');
const getAllGenres = require('../controllers/getAllGenres');
const fs = require('fs');
const { error } = require('console');

const postCustomVideogame = async (formData) => {
  const {
    name, summary, released, rating, genres, platform, image
  } = formData

  if(!name || !summary || !platform){
    throw new Error('Missing required information.') }

  const gameAlreadyExist = await Videogame.findOne({
    where:{ name }
  })

  if(gameAlreadyExist){
    throw new Error('The game already exist! Choose another name.') 
  }
  const newGame = await Videogame.create({
    name, summary, released, rating, platform, image  }) 

  const allGenres = await getAllGenres();
  const filteredGenres = genres.map(genre => (
    allGenres.find(g => g.name === genre)
  ))
  newGame.addGenres(filteredGenres)
  return {
    message: "New game added successfully!",
    game: newGame
  }
};

module.exports = postCustomVideogame;
const getGenres = async (req, res) => {
    try {
      res.status(200).send("Probando Ruta Genres");
    } catch (error) {
      res.status(404).send(error.message);
    }
  };
  
  module.exports = { getGenres };
  

const getPlatform = async (req, res)=>{
    try {
        res.status(200).send("Probando Ruta Platforms");
      } catch (error) {
        res.status(404).send(error.message);
      }
}


module.exports = {
  getPlatform
}
const ValidationFrom = (input, file) => {
    const errors = {}
  
    if (!(input.name) || (input.name.length < 6)) {
      errors.name = 'EL nombre dede tener 6 o mas caracteres'
    }
  
    if (!(input.description) || (input.description.length < 10)) {
      errors.description = 'La descripcion debe ser mayor a 10 caracteres'
    }
  
    if (!(input.date) || (input.date.length < 9)) {
      errors.date = 'Selecciona una fecha'
    }
  
    if (!(input.platforms) || (input.platforms.length < 1)) {
      errors.platforms = 'Selecciona una plataforma'
    }
  
    if (!(input.Rating) || (input.Rating.length < 2)) {
      errors.Rating = 'Agrega el Rating'
    }
    if (!(input.SearchGenre) || (input.SearchGenre.length < 2)) {
      errors.SearchGenre = 'Selecciona un genero'
    }
  
    if (!(input.image) && (file === null)) {
      // controla campo vacio y que no se haya cargado
      errors.file = 'Se tiene que cargar una imagen'
    }
  
    return errors
  }
  
  export default ValidationFrom
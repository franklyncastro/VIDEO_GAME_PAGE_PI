export const validacionesForm = (input) => {
  const errors = {};
  const patron = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;

  if (!input.name || input.name.trim().length < 4) {
    errors.name = "El nombre debe ser mayor a 4 caracteres";
  }

  if (!input.rating || input.rating.length < 1) {
    errors.rating = "Debe agregar una puntuacion";
  }

  if (!input.date || input.date.length < 9) {
    errors.date = "Debe seleccionar una fecha valida";
  }

  if (!input.description || input.description.trim().length < 10) {
    errors.description = "Descripcion debe tener al menos 10 caracteres";
  }

  if (!input.platforms || input.platforms.length < 2) {
    errors.platforms = "Debe seleccionar al menos una plataforma";
  }

  if (!input.searchGenres || input.searchGenres.length < 1) {
    errors.searchGenres = "Debe seleccionar al menos un genero";
  }

  if (!input.image || input.image.trim().length < 1) {
    errors.image = "Ingrese la URL de la imagen";
  } else {
    if (!patron.test(input.image)) {
      errors.image = "La URL de la imagen es inválida";
    }
  }

  return errors;
};

import React from "react";

const Genres = ({ allGenres }) => {
  return (
    <>
      {allGenres?.map((option, key) => (
        <option key={key} value={option.Nombre}>
          {option.Nombre}
        </option>
      ))}
    </>
  );
};

export default Genres;

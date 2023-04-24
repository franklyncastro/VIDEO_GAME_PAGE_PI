import React from "react";

const Genres = (AllGenres) => {
  const { allGenres } = AllGenres;

  return (
    <>
      {allGenres?.map((option, key) => (
        <select defaultValue="select">
        <option key={key} value={option.name}>
          {option.name}
        </option>
        </select>
      ))}
    </>
  );
};


export default Genres
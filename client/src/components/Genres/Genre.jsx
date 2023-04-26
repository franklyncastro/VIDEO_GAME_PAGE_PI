import React from "react";

const Genres = ({ allGenres }) => {
   return (
    <>
      {allGenres?.map((option, key) => (
        <option key={key} value={option.name}>
          {option.name}
        </option>
      ))}
    </>
  );
};

export default Genres;
